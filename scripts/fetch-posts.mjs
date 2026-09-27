/**
 * 티스토리 글 목록을 빌드 시점에 받아 JSON으로 저장한다.
 *
 * RSS에 CORS 헤더가 없어 브라우저에서 직접 읽을 수 없다. 빌드할 때 Node로 받아 두면
 * 화면에서는 저장된 결과만 불러다 쓰면 된다.
 *
 * prebuild 단계에서 실행되므로 배포할 때마다 갱신되고, refresh-posts.yml이 하루 한 번
 * 재배포를 실행해 새로 쓴 글을 반영한다.
 */
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const FEED = "https://allotherthings.tistory.com/rss";
/** 목록에 표시할 글 수. 대표 글 1건은 따로 분리한다 */
const LIST_SIZE = 5;
/** 대표 글 발췌 길이(자) */
const EXCERPT_LENGTH = 120;

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/constants/posts.generated.json",
);

/** 자주 쓰는 엔티티만 정의한다. 나머지는 숫자 참조로 들어온다 */
const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  middot: "·",
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
};

/* 티스토리는 엔티티를 두 번 이스케이프해서 내려준다. 값이 바뀌지 않을 때까지 반복해 디코딩한다 */
function decode(text) {
  let out = text;

  for (let i = 0; i < 3; i++) {
    const next = out
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
        String.fromCodePoint(parseInt(hex, 16)),
      )
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&(\w+);/g, (whole, name) => ENTITIES[name] ?? whole);

    if (next === out) break;
    out = next;
  }

  return out.trim();
}

/** CDATA로 감싸여 있어도 같은 값을 반환한다 */
function pick(block, tag) {
  const match = block.match(
    new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`),
  );
  return match ? decode(match[1]) : "";
}

function pickAll(block, tag) {
  return [
    ...block.matchAll(
      new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, "g"),
    ),
  ].map((m) => decode(m[1]));
}

/** "Tue, 21 Jul 2026 16:22:14 +0900" → "2026.07" */
function toYearMonth(pubDate) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/* category 첫 줄은 분류 경로("HTML, CSS/CSS Basics")이고 나머지는 태그다. */
function toTag(categories) {
  const path = categories.find((value) => value.includes("/")) ?? categories[0];
  if (!path) return "";
  return path.split("/").pop().trim().toUpperCase();
}

/** 본문에서 HTML 태그를 제거하고 앞부분만 남긴다 */
function toExcerpt(description) {
  const text = decode(description)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

function parse(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, block]) => ({
    date: toYearMonth(pick(block, "pubDate")),
    title: pick(block, "title"),
    href: pick(block, "link"),
    tag: toTag(pickAll(block, "category")),
    excerpt: toExcerpt(pick(block, "description")),
  }));
}

async function main() {
  let items;

  try {
    const response = await fetch(FEED, {
      headers: { "user-agent": "portfolio-build" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    items = parse(await response.text());
    if (!items.length) throw new Error("항목 없음");
  } catch (error) {
    /* 요청이 실패해도 배포는 중단하지 않는다. 이전에 받아 둔 파일이 있으면 그대로 사용한다 */
    if (existsSync(OUT)) {
      console.warn(`[posts] 가져오기 실패(${error.message}). 기존 파일을 유지합니다`);
      return;
    }
    throw error;
  }

  const [featured, ...rest] = items;

  writeFileSync(
    OUT,
    `${JSON.stringify(
      {
        source: FEED,
        featured,
        list: rest.slice(0, LIST_SIZE),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`[posts] ${items.length}건 받아 ${1 + Math.min(rest.length, LIST_SIZE)}건 기록`);
}

await main();
