// Central navigation structure for landing pages, reading paths, and articles
// Update this file to add, remove, or reorder navigation items

module.exports = {
  library: {
    title: "Library",
    url: "/library/",
    children: [
      "bondage-and-release",
      "hurt-and-restoration",
      "weariness-and-renewal",
      "about-the-author"
    ]
  },
  "bondage-and-release": {
    title: "Bondage and Release",
    url: "/bondage-and-release/",
    parent: "library",
    articles: [
      // Add article slugs here in order
    ]
  },
  "hurt-and-restoration": {
    title: "Hurt and Restoration",
    url: "/hurt-and-restoration/",
    parent: "library",
    articles: []
  },
  "weariness-and-renewal": {
    title: "Weariness and Renewal",
    url: "/weariness-and-renewal/",
    parent: "library",
    articles: []
  },
  "about-the-author": {
    title: "Get to Know the Author",
    url: "/about-the-author/",
    parent: "library"
  },
  "start-here": {
    title: "Start Here",
    url: "/start-here/",
    children: [
      "suffering-or-waiting",
      "wrestling-with-sin",
      "spiritually-numb",
      "know-who-you-are",
      "story-and-image",
      "sit-with-god",
      "relearning-grace",
      "seeking-wisdom"
    ]
  },
  "youre-not-alone": {
    title: "You're Not Alone",
    url: "/youre-not-alone/",
    articles: [
      "not-even-one",
      "keep-relapsing",
      "faith-and-shame",
      "sober-but-afraid",
      "next-step"
    ]
  }
  // Add more reading paths and articles as needed
};
