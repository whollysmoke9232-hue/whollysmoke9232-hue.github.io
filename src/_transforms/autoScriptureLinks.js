const scriptureLink = require("../_filters/scriptureLink");

const refRegex = /\b([1-3]?\s?[A-Za-z]+)\s(\d+):(\d+(-\d+)?)\b/g;

module.exports = function(content, outputPath) {
  if (!outputPath || !outputPath.endsWith(".html")) return content;

  return content.replace(refRegex, (match) => {
    const url = scriptureLink(match);
    return `<a class="scripture-inline" href="${url}" target="_blank" rel="noopener">${match}</a>`;
  });
};
