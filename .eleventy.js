const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

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

  eleventyConfig.addCollection("lettersFromConfinement", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("letters-from-confinement")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("theConfinementJournals", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("the-confinement-journals")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("standingInAwe", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("standing-in-awe")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("theHiddenLifeOfFaith", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("the-hidden-life-of-faith")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("whenLifeHurtsFindingPurposeInThePain", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("when-life-hurts-finding-purpose-in-the-pain")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("speakUpLordIDontHearSoWell", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("speak-up-lord-i-dont-hear-so-well")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("holdMyHandWalkingWithGod", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("hold-my-hand-walking-with-god")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("parablesAndReflections", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("parables-and-reflections")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("myStoryFromBrokennessToGrace", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("my-story-from-brokenness-to-grace")
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

  // 📚 Content collections (front matter category-based)
  function includeInLibrary(item) {
    return String(item.data?.excludeFromLibrary || "").trim().toLowerCase() !== "true";
  }

  function byCategory(api, categoryName) {
    return api.getAll().filter((item) => {
      const category = String(item.data?.category || "").trim().toLowerCase();
      return category === categoryName && includeInLibrary(item);
    });
  }

  eleventyConfig.addCollection("devotionals", (api) =>
    byCategory(api, "devotionals")
  );

  eleventyConfig.addCollection("excerpts", (api) =>
    byCategory(api, "excerpts")
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

  eleventyConfig.addCollection("poems", (api) =>
    byCategory(api, "poems")
  );

  eleventyConfig.addCollection("testimonies", (api) =>
    byCategory(api, "testimonies")
  );

  // Books shown in Library come from top-level book index pages.
  eleventyConfig.addCollection("books", (api) =>
    api
      .getFilteredByGlob("./src/books/*/index.md")
      .filter((item) => includeInLibrary(item))
      .sort((a, b) => String(a.data?.title || "").localeCompare(String(b.data?.title || "")))
  );

  // 🆕 Recent additions (strict last 7 days)
  eleventyConfig.addCollection("recentAdditions", (api) => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 7);

    return api
      .getAll()
      .filter((item) => {
        if (!item?.url) return false;
        if (item.url === "/") return false;
        if (item.data?.eleventyExcludeFromCollections) return false;
        if (!(item.date instanceof Date)) return false;
        const isLibraryEntry = item.url.startsWith("/library/");
        const isPoemsHub = item.url === "/poems/";
        if (!isLibraryEntry && !isPoemsHub) return false;
        if (isLibraryEntry && !includeInLibrary(item)) return false;
        return item.date >= cutoff && item.date <= now;
      })
      .sort((a, b) => b.date - a.date);
  });

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
  };
};
