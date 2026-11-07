export const dynamic = "force-static";

/**
 * Frontend-only deployment health check.
 * The showcase site intentionally runs without a database; this endpoint
 * reports that the application itself is up and serving requests.
 */
export async function GET() {
  return Response.json({
    ok: true,
    service: "siman-tak-web",
    mode: "frontend-static",
    timestamp: new Date().toISOString(),
  });
}
