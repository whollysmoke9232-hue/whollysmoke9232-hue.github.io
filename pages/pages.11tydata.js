const fs = require("fs");
const path = require("path");

module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      const inputPath = data?.page?.inputPath;
      if (!inputPath) return data.permalink;

      const slug = data?.page?.fileSlug;
      if (!slug) return data.permalink;

      const rootCandidate = path.join(process.cwd(), "src", `${slug}.md`);
      if (fs.existsSync(rootCandidate)) {
        return false;
      }

      return data.permalink;
    },
  },
};
