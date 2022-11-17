interface allCountry {
  name: string;
  code: string;
}

export interface newsState {
  category: string;
  countryData: allCountry[];
  countryName: string;
  countryCode: string;
  newsData: article[];
  page: 1;
  loadMore: boolean;
  totalResults: number;
  loading: string;
  currentRequestId: undefined | string;
  error: null | string;
}

interface source {
  id: number | null;
  name: string;
}

export interface article {
  source: source;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

export interface newsArguments {
  category: string;
  country: string;
  page: number;
}
