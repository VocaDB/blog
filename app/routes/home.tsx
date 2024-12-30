import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { allPosts, type Post } from "@/.content-collections/generated";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VocaDB Blog" },
    { name: "description", content: "Welcome to the official VocaDB blog" },
  ];
}

type BlogEntryInfo = Omit<
  Omit<Omit<Omit<Post, "content">, "date">, "html">,
  "_meta"
> & { date: Date };

export function loader({ context }: Route.LoaderArgs) {
  const posts = allPosts
    .map(
      (post): BlogEntryInfo => ({
        title: post.title,
        cover: post.cover,
        shortened: post.shortened,
        date: new Date(post.date),
        author: post.author,
        slug: post.slug,
        summary: post.summary,
      })
    )
    .slice(0, 5);
  return { message: context.VALUE_FROM_CLOUDFLARE, posts };
}

interface BlogEntryCardProps {
  entry: BlogEntryInfo;
}

const BlogEntryCard = ({ entry }: BlogEntryCardProps) => {
  return (
    <div>
      <Link to={"/blog/" + entry.slug}>
        <h1 className="text-4xl font-extrabold">{entry.title}</h1>
      </Link>
      <p className="text-muted-foreground mt-2">
        {entry.date.toLocaleDateString()}
      </p>
      <p className="text-muted-foreground mt-4">
        {entry.shortened}
        {"…"}
      </p>
    </div>
  );
};

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-2xl">
        {loaderData.posts.map((post) => (
          <BlogEntryCard entry={post} key={post.title} />
        ))}
      </div>
    </div>
  );
}
