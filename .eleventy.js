const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Make readingPaths available globally
  const readingPaths = require('./src/_data/readingPaths.js');
  eleventyConfig.addGlobalData('readingPaths', readingPaths);

  // Add a Nunjucks shortcode to parse query parameters
  eleventyConfig.addShortcode('parseQuery', function(url) {
    const query = {};
    if (!url) return query;
    const parts = url.split('?');
    if (parts.length < 2) return query;
    parts[1].split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      query[key] = decodeURIComponent(value || '');
    });
    return query;
  });
  // 🔍 Custom includes filter for substring matching
  eleventyConfig.addFilter("includes", function(str, substr) {
    if (!str || !substr) return false;
    return String(str).includes(substr);
  });
  // 🔍 Custom findIndex filter for array index lookup
  eleventyConfig.addFilter("findIndex", function(arr, val) {
    if (!arr || !val) return -1;
    return arr.indexOf(val);
  });
  // 🔍 Custom map filter for extracting properties from array of objects
  eleventyConfig.addFilter("map", function(arr, prop) {
    if (!arr || !prop) return [];
    return arr.map(item => item[prop]);
  });
  // 🔍 Custom includes filter for substring matching
  eleventyConfig.addFilter("includes", function(str, substr) {
    if (!str || !substr) return false;
    return String(str).includes(substr);
  });
  // 🔍 Custom findIndex filter for array index lookup
  eleventyConfig.addFilter("findIndex", function(arr, val) {
    if (!arr || !val) return -1;
    return arr.indexOf(val);
  });
  // 🔍 Custom includes filter for substring matching
  eleventyConfig.addFilter("includes", function(str, substr) {
    if (!str || !substr) return false;
    return String(str).includes(substr);
  });
  // 📚 Library collection for all markdown files in src/library
  eleventyConfig.addCollection("library", (api) =>
    api.getFilteredByGlob("./src/library/*.md")
  );

  // 🔗 Configure markdown to add anchor IDs to headings
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

  // 📚 Book collections
  eleventyConfig.addCollection("marginsBook", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("margins-where-god-begins")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("fracturedLight", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("fractured-light")
      .sort((a, b) => a.data.order - b.data.order);
  });

  // 🔄 Collection navigation filters
  eleventyConfig.addFilter("getPreviousCollectionItem", function (collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addFilter("getNextCollectionItem", function (collection, page) {
    const index = collection.findIndex(item => item.url === page.url);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  // 📅 Human-readable date (for templates)
  eleventyConfig.addFilter("readableDate", (dateValue) => {
    if (!dateValue) return "";
    if (dateValue instanceof Date) {
      return DateTime.fromJSDate(dateValue, { zone: "utc" })
        .toFormat("MMMM d, yyyy");
    }
    const dt = DateTime.fromISO(String(dateValue), { zone: "utc" });
    return dt.isValid ? dt.toFormat("MMMM d, yyyy") : "";
  });

  // ✅ ISO-8601 date (FOR SITEMAP <lastmod>)
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return null;
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // 🔗 Slug filter
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return String(str)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  });

  // 🧠 extractBlock filter
  eleventyConfig.addFilter("extractBlock", function (content, heading) {
    if (!content || !heading) return "";
    const regex = new RegExp(
      `${heading}\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`,
      "i"
    );
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  });

  // 🏷️ filterByTag
  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    return (collection || []).filter(
      (item) => item.data?.tags?.includes(tag)
    );
  });

  // 📚 Content collections
  eleventyConfig.addCollection("devotionals", (api) =>
    api.getFilteredByGlob("./src/devotionals/*.md")
  );

  eleventyConfig.addCollection("reflections", (api) =>
    api.getFilteredByGlob("./src/reflections/*.md")
  );

  eleventyConfig.addCollection("meditations", (api) =>
    api.getFilteredByGlob("./src/meditations/*.md")
  );

  eleventyConfig.addCollection("stories", (api) =>
    api.getFilteredByGlob("./src/stories/*.md")
  );

  eleventyConfig.addCollection("testimonies", (api) =>
    api.getFilteredByGlob("./src/testimonies/*.md")
  );

  // 📚 Books collection for Library
  eleventyConfig.addCollection("books", (api) =>
    api.getFilteredByGlob("./src/books/*/index.md")
  );

  // 🏷️ Tag list
  eleventyConfig.addCollection("tagList", function (collection) {
    const tagSet = new Set();
    collection.getAll().forEach((item) => {
      if (Array.isArray(item.data?.tags)) {
        item.data.tags
          .filter((tag) => tag && tag !== "devotionals")
          .forEach((tag) => {
            tagSet.add(
              String(tag)
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
            );
          });
      }
    });
    return [...tagSet];
  });

  // 📖 Scripture list and collection
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

  // 📖 Scripture posts map (for individual scripture pages)
  eleventyConfig.addCollection("scriptureMap", function (collection) {
    const scriptureMap = {};
    collection.getAll().forEach((item) => {
      if (Array.isArray(item.data?.scripture)) {
        item.data.scripture.forEach((ref) => {
          if (ref) {
            if (!scriptureMap[ref]) {
              scriptureMap[ref] = [];
            }
            scriptureMap[ref].push(item);
          }
        });
      }
    });
    return scriptureMap;
  });

  // 📦 Passthrough copy
  eleventyConfig.addPassthroughCopy({ "assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });

  // 📁 Directory structure
    return {
      dir: {
        input: "src",
        includes: "_includes",
        output: "docs",
      },
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dataTemplateEngine: "njk"
    };
};
