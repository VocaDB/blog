import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    slug: z.string(),
    author: z.string(),
    summary: z.string(),
    date: z.string().date(),
    cover: z.string(),
  }),
  transform: async (doc, context) => {
    const html = await compileMarkdown(context, doc);
    const shortened = doc.content
      .split("\n")
      .filter((line) => !line.startsWith("#") && line !== "")
      .join(" ")
      .split(" ")
      .slice(0, 50)
      .join(" ");
    return { ...doc, html, shortened };
  },
});

export default defineConfig({
  collections: [posts],
});
