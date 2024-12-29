import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout.tsx", [
    index("routes/home.tsx"),
    route("/about", "./routes/posts.tsx"),
    route("/blog/:slug", "./routes/posts/blog-entry.tsx"),
  ]),
  route("/api/posts.json", "./routes/posts-json.ts"),
] satisfies RouteConfig;
