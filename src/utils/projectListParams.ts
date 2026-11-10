import { createParser, createSerializer, parseAsString } from "nuqs";
import {
  INVOLVEMENT_OPTIONS,
  PLATFORM_OPTIONS,
  WORK_TYPE_OPTIONS,
  type Involvement,
  type Platform,
  type WorkType,
} from "@constants/projects";

// 옵션을 추가하면 슬러그도 함께 추가하도록 Record로 강제한다
const PLATFORM_SLUGS: Record<Platform, string> = {
  웹: "web",
  모바일: "mobile",
};

const WORK_TYPE_SLUGS: Record<WorkType, string> = {
  "프론트엔드 개발": "frontend",
  퍼블리싱: "publishing",
  "웹 디자인": "design",
};

const INVOLVEMENT_SLUGS: Record<Involvement, string> = {
  "신규 구축": "new",
  "레거시 현대화": "legacy",
};

function parseAsFilterGroup<T extends string>(
  options: readonly T[],
  slugs: Record<T, string>,
) {
  return createParser<T[]>({
    // 쉼표로 이어진 슬러그를 옵션으로 되돌린다. 모르는 슬러그와 중복은 버린다
    parse: (value) => {
      const picked = new Set(value.split(","));
      return options.filter((option) => picked.has(slugs[option]));
    },
    // 클릭 순서가 아니라 선언 순서로 내보내 URL을 안정적으로 유지한다
    serialize: (selected) =>
      options
        .filter((option) => selected.includes(option))
        .map((option) => slugs[option])
        .join(","),
    // 기본값([])과 같으면 nuqs가 키를 URL에서 지우도록 순서 무시 비교를 쓴다
    eq: (a, b) => a.length === b.length && a.every((item) => b.includes(item)),
  }).withDefault([]);
}

const platform = parseAsFilterGroup(PLATFORM_OPTIONS, PLATFORM_SLUGS);
const workType = parseAsFilterGroup(WORK_TYPE_OPTIONS, WORK_TYPE_SLUGS);
const involvement = parseAsFilterGroup(INVOLVEMENT_OPTIONS, INVOLVEMENT_SLUGS);
const stackQuery = parseAsString.withDefault("");
// 켜졌을 때만 side=1이 URL에 남는다
const includeSide = createParser<boolean>({
  parse: (value) => (value === "1" ? true : null),
  serialize: () => "1",
}).withDefault(false);

export const projectListParsers = {
  platform,
  workType,
  involvement,
  stackQuery,
  includeSide,
};

export const projectListUrlKeys = {
  workType: "type",
  stackQuery: "stack",
  includeSide: "side",
};

// 기본값과 같은 필터는 직렬화에서 빠지므로 필터가 없으면 빈 문자열이 나온다
export const serializeProjectListQuery = createSerializer(projectListParsers, {
  urlKeys: projectListUrlKeys,
});

// 상세 페이지의 돌아가기 링크가 마지막 목록 필터를 되살리도록 sessionStorage에 남긴다.
// 외부 링크로 상세에 바로 들어오면 저장된 값이 없어 그냥 /projects로 간다
const PROJECT_LIST_SEARCH_STORAGE_KEY = "projects-list-search";

export function saveProjectListSearch(search: string) {
  try {
    window.sessionStorage.setItem(PROJECT_LIST_SEARCH_STORAGE_KEY, search);
  } catch {
    // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 필터 복원만 포기한다.
  }
}

export function projectListPath() {
  try {
    const stored = window.sessionStorage.getItem(PROJECT_LIST_SEARCH_STORAGE_KEY);
    if (stored !== null && (stored === "" || stored.startsWith("?"))) {
      return `/projects${stored}`;
    }
  } catch {
    // 저장소를 읽을 수 없으면 기본 경로로 돌아간다.
  }
  return "/projects";
}
