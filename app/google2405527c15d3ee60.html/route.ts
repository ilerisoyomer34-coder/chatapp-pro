export function GET() {
  return new Response(
    "google-site-verification: google2405527c15d3ee60.html",
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}
