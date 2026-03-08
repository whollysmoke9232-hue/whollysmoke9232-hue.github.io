module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      // Preserve explicit permalinks
      if (data.permalink) return data.permalink;

      // Library entries publish under /library/, categories publish separately.
      if (!data.page?.fileSlug) {
        throw new Error(
          `Missing file slug for ${data.page?.inputPath}`
        );
      }

      return `/library/${data.page.fileSlug}/`;
    },
  },
};
