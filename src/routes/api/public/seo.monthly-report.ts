import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/seo/monthly-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.CRON_SECRET;
        const provided =
          request.headers.get("x-cron-secret") ??
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
          "";
        if (!expected || provided !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }
        try {
          const { generateAndStoreMonthlyReport } = await import(
            "@/lib/seo-report.server"
          );
          const report = await generateAndStoreMonthlyReport("cron-monthly");
          return Response.json({
            ok: true,
            period: `${report.periodStart}..${report.periodEnd}`,
            clicks: report.totals.clicks,
            impressions: report.totals.impressions,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          console.error("[seo-monthly-report]", message);
          return Response.json({ ok: false, message }, { status: 502 });
        }
      },
    },
  },
});
