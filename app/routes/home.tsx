import type { Route } from "./+types/home";
import { allPosts, type Post } from "@/.content-collections/generated";
import { Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/avatar";
import { cn } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VocaDB Blog" },
    { name: "description", content: "Welcome to the official VocaDB blog" },
  ];
}

type BlogEntryInfo = Omit<
  Omit<Omit<Omit<Omit<Post, "content">, "date">, "html">, "_meta">,
  "authors"
> & {
  date: Date;
};

export function loader() {
  const posts = allPosts
    .map(
      (post): BlogEntryInfo => ({
        title: post.title,
        cover: post.cover,
        shortened: post.shortened,
        date: new Date(post.date),
        parsedAuthors: post.parsedAuthors,
        slug: post.slug,
      })
    )
    .slice(0, 5)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return { posts };
}

interface BlogEntryCardProps {
  compact?: boolean;
  entry: BlogEntryInfo;
}

const BlogEntryCard = ({ entry, compact = false }: BlogEntryCardProps) => {
  return (
    <div>
      <Link to={"/blog/" + entry.slug}>
        <h1 className="text-4xl font-extrabold underline decoration-transparent hover:decoration-foreground transition-colors duration-300">
          {entry.title}
        </h1>
      </Link>
      <p className={cn(compact ? "mt-1" : "mt-2", "text-muted-foreground")}>
        {entry.date.toLocaleDateString()}
      </p>
      <p
        className={cn(
          compact ? "mt-2" : "mt-4",
          "text-muted-foreground line-clamp-3"
        )}
      >
        {entry.shortened}
        {"…"}
      </p>
      <div className={cn(compact ? "mt-2" : "mt-4", "flex flex-row gap-4")}>
        {entry.parsedAuthors.map((author) => (
          <div key={author.id} className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage
                alt=""
                src={`https://static.vocadb.net/img/user/mainTiny/${author.avatarSrc}`}
              />
              <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">{author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const posts = loaderData.posts;
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl">
        {posts.length > 0 && <BlogEntryCard entry={posts[0]} />}
        <div className="flex flex-row gap-[2%] flex-wrap">
          {posts.length > 1 &&
            loaderData.posts.slice(1).map((post) => (
              <div className="md:w-5/12 grow mt-4" key={post.slug}>
                <BlogEntryCard compact entry={post} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
