module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      // Preserve explicit permalinks
      if (data.permalink) return data.permalink;

      // Use category (which you already added everywhere)
      if (!data.category || !data.page?.fileSlug) {
        throw new Error(
          `Missing category for ${data.page?.inputPath}`
        );
      }

      return `/${data.category}/${data.page.fileSlug}/`;
    },
  },
};
