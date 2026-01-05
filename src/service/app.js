const API_KEY = "f40d210066494ecfbba32ff5b312d384";
const BASE_URL = "https://api.rawg.io/api";

export const fetchGenres = async () => {
  const res = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
  const data = await res.json();
  return data.results.slice(0, 4);
};

export const fetchGames = async ({ searchTerm, activeCategory, page = 1 }) => {
  let url = `${BASE_URL}/games?key=${API_KEY}&page_size=12&page=${page}`;

  if (searchTerm) url += `&search=${searchTerm}`;
  if (activeCategory) url += `&genres=${activeCategory}`;

  const res = await fetch(url);
  const data = await res.json();
  return {
    results: data.results,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
};
