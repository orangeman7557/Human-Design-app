// Dynamic robots.txt (2026-08). Production invites crawlers and points them at
// the sitemap; staging / preview hosts are blocked entirely so the unlinked
// test site (which now hosts the private analytics dashboard) never gets
// indexed. Served by the Worker — prerender=false — so it can vary per host,
// which a single static file cannot. Replaces the former static/robots.txt.
export const prerender = false;

export function GET({ url }) {
  const staging = /^staging\.|-staging\./.test(url.hostname);
  const body = staging
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://hdchart.app/sitemap.xml\n';
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
}
