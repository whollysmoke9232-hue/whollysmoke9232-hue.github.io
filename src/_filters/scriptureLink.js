function scriptureLink(ref) {
  if (!ref) return "";

  // Replace spaces with +
  const encoded = ref.replace(/\s+/g, "+");

  return `https://www.biblegateway.com/passage/?search=${encoded}&version=NASB`;
}

module.exports = scriptureLink;
