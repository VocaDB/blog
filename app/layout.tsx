import { ExternalLink } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <div>
      <header className="sticky top-0 h-16 backdrop-blur border-b border-[hsl(var(--border))]">
        <div className="container gap-4 flex items-center">
          <Link to="/">
            <img className="max-h-16" src="/VocaDB_Logo.svg" />
          </Link>
          <Link to="/">Home</Link>
          <Link to="//wiki.vocadb.net">Wiki</Link>
          <Link
            target="_blank"
            className="flex items-center"
            to="//patreon.com/vocadb"
          >
            Patreon <ExternalLink className="size-4 ml-1" />
          </Link>
        </div>
      </header>
      <div className="px-4 md:px-0 pt-8">
        <Outlet />
      </div>
    </div>
  );
}
