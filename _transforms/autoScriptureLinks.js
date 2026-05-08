const scriptureLink = require("../_filters/scriptureLink");

const refRegex = /\b([1-3]?\s?[A-Za-z]+)\s(\d+):(\d+(-\d+)?)\b/g;
const anchorRegex = /<a\b[^>]*>[\s\S]*?<\/a>/gi;

module.exports = function(content, outputPath) {
  if (!outputPath || !outputPath.endsWith(".html")) return content;

  let lastIndex = 0;
  let result = "";
  let anchorMatch;

  while ((anchorMatch = anchorRegex.exec(content)) !== null) {
    const beforeAnchor = content.slice(lastIndex, anchorMatch.index);
    result += beforeAnchor.replace(refRegex, (match) => {
      const url = scriptureLink(match);
      return `<a class="scripture-inline" href="${url}" target="_blank" rel="noopener">${match}</a>`;
    });

    result += anchorMatch[0];
    lastIndex = anchorMatch.index + anchorMatch[0].length;
  }

  const tail = content.slice(lastIndex);
  result += tail.replace(refRegex, (match) => {
    const url = scriptureLink(match);
    return `<a class="scripture-inline" href="${url}" target="_blank" rel="noopener">${match}</a>`;
  });

  return result;
};
