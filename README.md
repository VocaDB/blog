# VocaDB Blog

This repository contains the source code and content for the VocaDB blog, hosted at [blog.vocadb.net](https://blog.vocadb.net). The blog shares updates, guides, and insights related to VocaDB, a comprehensive database for Vocaloid and related music.

## Features

- Static site generation for fast performance
- Asset bundling and optimization
- SEO-friendly architecture
- Markdown-based content management
- TailwindCSS for modern, responsive styling
- Easy deployment via Wrangler CLI

---

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (for deployment)

### Installation

Install project dependencies:

```bash
npm install
```

## Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The blog will be available at http://localhost:5173.

## Adding New Content

Content for the blog is managed using Markdown files. To add a new post:

1. Navigate to the posts/ directory.
2. Create a new .md file for your post.
3. Use the frontmatter format for metadata (e.g., title, date, tags).
