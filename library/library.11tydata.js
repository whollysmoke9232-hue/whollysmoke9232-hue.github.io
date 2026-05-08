module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      // Legacy Fractured Light filenames are retained for reference but should not publish.
      if (data.page?.fileSlug?.startsWith("fractured-light-the-")) {
        return false;
      }

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
