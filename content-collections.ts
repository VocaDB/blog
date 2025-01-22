import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const markdownToPlainText = (markdown: string): string => {
  // Remove headers (lines starting with #)
  markdown = markdown.replace(/^#+\s.*$/gm, "");

  // Remove images (![](...))
  markdown = markdown.replace(/!\[[^\]]*\]\([^\)]*\)/g, "");

  // Replace links [text](url) with just "text"
  markdown = markdown.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove any remaining formatting characters (*, _, etc.)
  markdown = markdown.replace(/[*_~`]/g, "");

  // Trim excess whitespace and normalize line breaks
  return markdown.trim().replace(/\n{2,}/g, "\n");
};

const authorToID: Record<string, number> = {
  andreoda: 1083,
  riipah: 12,
  shiroizu: 329,
  pyther: 14922,
};

const authorToProfileImage: Record<string, string> = {
  andreoda: "1083.jpg",
  riipah: "12.png",
  shiroizu: "329.jpg",
  pyther: "14922.jpg",
};

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    slug: z.string(),
    authors: z.array(z.string()),
    date: z.string().date(),
    cover: z.string().optional(),
  }),
  transform: async (doc, context) => {
    const html = await compileMarkdown(context, doc);
    const filteredMarkdown = doc.content
      .split("\n")
      .filter((line) => !line.startsWith("_"))
      .join("\n");
    const shortened = markdownToPlainText(filteredMarkdown)
      .split(" ")
      .slice(0, 50)
      .join(" ");
    const parsedAuthors = doc.authors
      .filter((author) => author in authorToID)
      .map((author) => ({
        name: author,
        id: authorToID[author],
        avatarSrc: authorToProfileImage[author],
      }));
    return { ...doc, html, shortened, parsedAuthors };
  },
});

export default defineConfig({
  collections: [posts],
});
