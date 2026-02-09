const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

  // ===============================
  // Markdown Configuration
  // ===============================
  const markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false,
    level: [1, 2, 3, 4],
    slugify: (s) =>
      s.toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  // ===============================
  // Utility Filters
  // ===============================

  eleventyConfig.addFilter("getPreviousCollectionItem", function (collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addFilter("getNextCollectionItem", function (collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  eleventyConfig.addFilter("readableDate", (dateValue) => {
    if (!dateValue) return "";
    if (dateValue instanceof Date) {
      return DateTime.fromJSDate(dateValue, { zone: "utc" })
        .toFormat("MMMM d, yyyy");
    }
    const dt = DateTime.fromISO(String(dateValue), { zone: "utc" });
    return dt.isValid ? dt.toFormat("MMMM d, yyyy") : "";
  });

  eleventyConfig.addFilter("shortDate", (dateValue) => {
    if (!dateValue) return "";
    if (dateValue instanceof Date) {
      return DateTime.fromJSDate(dateValue, { zone: "utc" })
        .toFormat("LLL d yyyy");
    }
    const dt = DateTime.fromISO(String(dateValue), { zone: "utc" });
    return dt.isValid ? dt.toFormat("LLL d yyyy") : "";
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return null;
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return String(str)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  });

  eleventyConfig.addFilter("extractBlock", function (content, heading) {
    if (!content || !heading) return "";
    const regex = new RegExp(
      `${heading}\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`,
      "i"
    );
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  });

  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    return (collection || []).filter(
      (item) => item.data?.tags?.includes(tag)
    );
  });

  // ===============================
  // CORE LIBRARY COLLECTION
  // ===============================

  eleventyConfig.addCollection("libraryArticles", (api) =>
    api.getFilteredByGlob("./src/library/*.md")
      .filter(item => item.data?.excludeFromLibrary !== true)
  );

  // ===============================
  // CATEGORY-BASED COLLECTIONS
  // ===============================

  function byCategory(api, categoryName) {
    return api.getFilteredByGlob("./src/library/*.md")
      .filter(item =>
        String(item.data?.category || "")
          .trim()
          .toLowerCase() === categoryName
      )
      .filter(item => item.data?.excludeFromLibrary !== true);
  }

  eleventyConfig.addCollection("devotionals", (api) =>
    byCategory(api, "devotionals")
  );

  eleventyConfig.addCollection("reflections", (api) =>
    byCategory(api, "reflections")
  );

  eleventyConfig.addCollection("meditations", (api) =>
    byCategory(api, "meditations")
  );

  eleventyConfig.addCollection("stories", (api) =>
    byCategory(api, "stories")
  );

  eleventyConfig.addCollection("testimonies", (api) =>
    byCategory(api, "testimonies")
  );

  // ===============================
  // BOOKS COLLECTION
  // ===============================

  eleventyConfig.addCollection("books", (api) =>
    api.getFilteredByGlob("./src/books/*/index.md")
  );

  // ===============================
  // ORDERED BOOK CHAPTER COLLECTIONS
  // ===============================

  eleventyConfig.addCollection("marginsBook", (api) =>
    api.getFilteredByTag("margins-where-god-begins")
      .sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("fracturedLight", (api) =>
    api.getFilteredByTag("fractured-light")
      .sort((a, b) => a.data.order - b.data.order)
  );

  // ===============================
  // TAG SYSTEM
  // ===============================

  eleventyConfig.addCollection("tagList", function (collection) {
    const tagSet = new Set();
    const libraryItems = collection.getFilteredByGlob("./src/library/*.md");

    libraryItems.forEach((item) => {
      if (Array.isArray(item.data?.tags)) {
        item.data.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet].sort((a, b) =>
      String(a).localeCompare(String(b), "en", { sensitivity: "base" })
    );
  });

  // ===============================
  // SCRIPTURE SYSTEM
  // ===============================

  eleventyConfig.addCollection("scriptureList", function (collection) {
    const scriptureSet = new Set();
    collection.getAll().forEach((item) => {
      if (Array.isArray(item.data?.scripture)) {
        item.data.scripture.forEach((ref) => {
          if (ref) scriptureSet.add(ref);
        });
      }
    });
    return [...scriptureSet].sort();
  });

  eleventyConfig.addCollection("scriptureMap", function (collection) {
    const scriptureMap = {};
    collection.getAll().forEach((item) => {
      if (Array.isArray(item.data?.scripture)) {
        item.data.scripture.forEach((ref) => {
          if (!scriptureMap[ref]) scriptureMap[ref] = [];
          scriptureMap[ref].push(item);
        });
      }
    });
    return scriptureMap;
  });

  // ===============================
  // PASSTHROUGH COPY
  // ===============================

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  // ===============================
  // DIRECTORY STRUCTURE
  // ===============================

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },
  };
};
