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

      // Restore homepage rendering from the legacy source file.
      if (fileName === "index - Copy.md" && isRootLevel) {
        return "/";
      }

      // Avoid duplicate / output while homepage is sourced from index - Copy.md.
      if (fileName === "index.md" && isRootLevel) {
        return false;
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
