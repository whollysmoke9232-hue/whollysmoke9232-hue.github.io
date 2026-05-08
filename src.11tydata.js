const fs = require("fs");
const path = require("path");

module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      const inputPath = data?.page?.inputPath;
      const fileSlug = data?.page?.fileSlug;
      if (!inputPath || !fileSlug) return data.permalink;

      const fileName = path.basename(inputPath);
      const dirName = path.dirname(inputPath);
      const isRootLevel = dirName === "./src" || dirName.endsWith("\\src");

      // Root homepage source is src/index.md.
      if (fileName === "index.md" && isRootLevel) {
        return "/";
      }

      if (fileName.includes(" - Copy.")) {
        return false;
      }

      if (!isRootLevel) return data.permalink;
      if (!fileSlug.endsWith("-index")) return data.permalink;

      const folderName = fileSlug.replace(/-index$/, "");
      const folderAliases = {
        devotional: "devotionals",
        meditation: "meditations",
        reflection: "reflections",
        story: "stories",
        testimony: "testimonies",
      };
      const resolvedFolder = folderAliases[folderName] || folderName;
      const folderIndex = path.join(process.cwd(), "src", resolvedFolder, "index.md");

      if (fs.existsSync(folderIndex)) {
        return false;
      }

      return data.permalink;
    },
  },
};
