import { allPosts } from "@/.content-collections/generated";

export async function loader() {
  return new Response(JSON.stringify(allPosts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
