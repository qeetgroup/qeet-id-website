/**
 * /blog — the index's words. The posts themselves, each checked against the
 * code, are in lib/blog.ts.
 */
export const BLOG_PAGE = {
  meta: {
    title: "Blog",
    description:
      "How Qeet ID is built — engineering notes on its audit log, its logging and its tokens, each checked against the code on the day it was published.",
  },
  kicker: "Blog",
  title: ["How Qeet ID is built.", "Checked against the code."],
  lede: "Engineering notes from the people building Qeet ID. Each one describes the code as it is, and says the day it was checked.",
  latest: "Latest",
  more: "More notes",
  close: ["See how it all fits together.", "Or talk to us."],
  article: {
    crumb: "Blog",
    kind: "Engineering",
    by: "By",
    published: "Published",
    length: "Length",
    checked: "Checked against the code",
    contents: "On this page",
    lives: "Where this lives",
    end: "Checked against Qeet ID's code on",
    wrong: "Something out of date?",
    tell: "Tell us",
    keep: "Keep reading",
  },
} as const;
