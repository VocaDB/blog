import { allPosts } from "@/.content-collections/generated";
import type { Route } from "./+types/blog-entry";
import { data } from "react-router";
import markdownit from "markdown-it";

export const loader = ({ params }: Route.LoaderArgs) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (post === undefined) {
    throw data("Blog entry not found", { status: 404 });
  }

  const md = markdownit();
  const parsed = md.render(post.content);

  return { blogPostContent: parsed, title: post.title };
};

export default function BlogEntry(props: Route.ComponentProps) {
  return (
    <div className="w-full flex justify-center px-4 md:px-0">
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: props.loaderData.blogPostContent }}
      />
    </div>
  );
}
