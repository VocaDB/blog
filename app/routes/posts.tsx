import { allPosts } from "content-collections";
import type { Route } from "./+types/posts";

export default function Test(props: Route.ComponentProps) {
  return <>{JSON.stringify(allPosts)}</>;
}
