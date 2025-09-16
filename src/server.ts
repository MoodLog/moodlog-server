import express from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 3000);

// Supabase 초기화 (환경변수 없으면 서버는 뜨되 /moods 에서는 503 반환)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

if (!supabase) {
  console.warn(
    "[WARN] SUPABASE_URL 또는 SUPABASE_ANON_KEY가 설정되지 않았습니다. /moods 엔드포인트는 503을 반환합니다."
  );
}

// 최소 OpenAPI 스펙
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Moodlog API",
    version: "1.0.0",
    description: "Express + Supabase + Swagger 기반 API",
  },
  servers: [
    {
      url: "http://localhost:{port}",
      variables: {
        port: {
          default: String(PORT),
        },
      },
    },
  ],
  paths: {
    "/health": {
      get: {
        summary: "서버 상태 확인",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    time: { type: "string", format: "date-time" },
                  },
                  required: ["status", "time"],
                },
                example: { status: "ok", time: new Date().toISOString() },
              },
            },
          },
        },
      },
    },
    "/moods": {
      get: {
        summary: "moods 테이블 목록 조회 (최대 50개, 최신순)",
        responses: {
          "200": {
            description: "목록 반환",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      mood: { type: "string" },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
                example: [
                  { id: 1, mood: "happy", created_at: "2024-01-01T00:00:00Z" },
                ],
              },
            },
          },
          "503": {
            description: "Supabase 미구성",
          },
          "500": {
            description: "서버 내부 오류",
          },
        },
      },
    },
  },
} as const;

// Swagger UI 마운트
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// 루트 → /docs 리디렉트
app.get("/", (_req, res) => {
  res.redirect("/docs");
});

// 헬스체크
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// moods 조회 (Supabase 필요)
app.get("/moods", async (_req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase가 구성되지 않았습니다. 환경변수를 설정하세요.",
    });
  }
  try {
    const { data, error } = await supabase
      .from("moods")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data ?? []);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(
    `[moodlog-server] running at http://localhost:${PORT} (docs: /docs)`
  );
});
