const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

  /* ===============================
     📚 COLLECTIONS (CATEGORY-BASED)
  =============================== */

  // Master library collection (all library content except excluded)
  eleventyConfig.addCollection("library", (api) =>
    api.getFilteredByGlob("./src/library/*.md")
       .filter(item => !item.data.excludeFromLibrary)
  );

  // Category-driven collections
  function categoryCollection(categoryName) {
    return (api) =>
      api.getFilteredByGlob("./src/library/*.md")
        .filter(item =>
          item.data.category === categoryName &&
          !item.data.excludeFromLibrary
        )
        .sort((a, b) => (b.date || 0) - (a.date || 0));
  }

  eleventyConfig.addCollection("devotionals", categoryCollection("devotionals"));
  eleventyConfig.addCollection("meditations", categoryCollection("meditations"));
  eleventyConfig.addCollection("reflections", categoryCollection("reflections"));
  eleventyConfig.addCollection("stories", categoryCollection("stories"));
  eleventyConfig.addCollection("testimonies", categoryCollection("testimonies"));

  // Books (separate structure)
  eleventyConfig.addCollection("books", (api) =>
    api.getFilteredByGlob("./src/books/*/index.md")
  );

  /* ===============================
     📖 SCRIPTURE COLLECTION
  =============================== */

  eleventyConfig.addCollection("scriptureList", function(api) {
    const posts = api.getAll();
    const scriptureSet = new Set();

    posts.forEach(post => {
      if (post.data.scripture && Array.isArray(post.data.scripture)) {
        post.data.scripture.forEach(ref => {
          scriptureSet.add(ref);
        });
      }
    });

    return Array.from(scriptureSet).sort();
  });

  /* ===============================
     🔍 FILTERS
  =============================== */

  eleventyConfig.addFilter("includes", (str, substr) =>
    str && substr ? String(str).includes(substr) : false
  );

  eleventyConfig.addFilter("findIndex", (arr, val) =>
    Array.isArray(arr) ? arr.indexOf(val) : -1
  );

  eleventyConfig.addFilter("map", (arr, prop) =>
    Array.isArray(arr) ? arr.map(item => item[prop]) : []
  );

  eleventyConfig.addFilter("slug", (str) =>
    str
      ? String(str)
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : ""
  );

  /* ===============================
     📅 DATE FILTERS
  =============================== */

  eleventyConfig.addFilter("readableDate", (dateValue) => {
    if (!dateValue) return "";
    const dt = dateValue instanceof Date
      ? DateTime.fromJSDate(dateValue, { zone: "utc" })
      : DateTime.fromISO(String(dateValue), { zone: "utc" });

    return dt.isValid ? dt.toFormat("MMMM d, yyyy") : "";
  });

  eleventyConfig.addFilter("isoDate", (dateObj) =>
    dateObj ? new Date(dateObj).toISOString().split("T")[0] : null
  );

  /* ===============================
     🔗 MARKDOWN CONFIG
  =============================== */

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    permalink: false,
    slugify: (s) =>
      s
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
  });

  eleventyConfig.setLibrary("md", markdownLibrary);

  /* ===============================
     📦 PASSTHROUGH
  =============================== */

  eleventyConfig.addPassthroughCopy({ "assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });

  /* ===============================
     📁 DIRECTORY CONFIG
  =============================== */

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },

    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
