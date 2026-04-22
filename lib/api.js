const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function httpGet(path, params = {}) {
  const url = new URL(`${BASE}${path}`);

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET ${path} failed (${res.status}): ${text}`);
  }

  return res.json().catch(() => ({}));
}

export const api = {
  getTopBooks: (params = { limit: 10, period: "last_weeks" }) =>
    httpGet("/books/top", params),

  getCategories: () => httpGet("/categories"),

  searchBooks: (filters) => httpGet("/books", filters),

  getBookDetail: (id) => httpGet(`/books/${id}`),

  getCoworkingSpaces: () => httpGet("/coworking/spaces"),

  getCoworkingSpaceDetail: (id) => httpGet(`/coworking/spaces/${id}`),
};