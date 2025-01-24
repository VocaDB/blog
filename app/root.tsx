import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { ThemeProvider } from "./components/theme-provider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://cdn.fontshare.com" },
  {
    rel: "preload",
    fetchPriority: "high",
    as: "image",
    href: "/images/miku_ievan_polka.webp",
    type: "image/webp",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: stylesheet },
];

export const meta = () => {
  return [
    { title: "VocaDB Blog" },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "VocaDB Blog",
    },
    {
      property: "og:image",
      content: "https://blog.vocadb.net/profile.jpg",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="twitter:creator" content="@VocaDB" />
        <meta property="twitter:site" content="@VocaDB" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:description"
          content="Welcome to the official VocaDB blog"
        />
        <meta
          name="description"
          content="Welcome to the official VocaDB blog"
        />
        <script
          defer
          src="https://vocadb-analytics.fly.dev/script.js"
          data-website-id="a8fa7dc0-b1f8-4fff-b9cc-48a3d1520caa"
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="blog-theme-key">
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
