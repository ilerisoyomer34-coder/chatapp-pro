export function GET() {
  return new Response(
    "google-site-verification: googleafcab923dcd0e885.html",
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}
