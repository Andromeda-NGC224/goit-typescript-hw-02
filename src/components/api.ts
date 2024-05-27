import axios from "axios";
import { ImageInterface } from "../components/App/App.types";

axios.defaults.baseURL = `https://api.unsplash.com/`;

export const fetchImg = async (
  searchQuery: string,
  currantPage: number
): Promise<ImageInterface[]> => {
  const response = await axios.get(`search/photos/`, {
    params: {
      client_id: `6p0keLQUHzQzr6IA0q0YR_JyZD57g8hMu-E4H2DXlL0`,
      query: searchQuery,
      per_page: 12,
      page: currantPage,
      orientation: `landscape`,
    },
  });

  return response.data.results;
};
