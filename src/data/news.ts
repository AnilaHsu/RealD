import axios from "axios";
import { article } from "../type";

interface NewsType {
  status: string;
  totalResults: number;
  articles: article[];
}

export async function fetchNewsData(
  category: string,
  country: string,
  apiKey: string,
  pageSize: number,
  page: number
) {
  const response = await axios.get<NewsType>(
    "https://newsapi.org/v2/top-headlines",
    {
      params: {
        category,
        country,
        apiKey,
        pageSize,
        page
      },
    }
  );
  
  return response.data;
}
