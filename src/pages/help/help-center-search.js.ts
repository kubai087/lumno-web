import type { APIRoute } from "astro";
import source from "../../scripts/help-center-search.js?raw";

// The help search's matching rules, shared with the extension; the search box loads it on first use.
export const GET: APIRoute = () => new Response(source, { headers: { "Content-Type": "text/javascript; charset=utf-8" } });
