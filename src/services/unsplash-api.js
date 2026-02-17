import axios from "axios";

const ACCESS_KEY = "c4eOyOBnya0e8BUzarWYsRx7J0QFXjGyVG2lkVUthWs";
axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(`/search/photos`, {
    params: {
      query: query,
      page: page,
      per_page: perPage,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
