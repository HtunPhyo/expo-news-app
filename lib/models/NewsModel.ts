// src/models/NewsModel.ts
interface Sentimentstats {
  positive: number;
  neutral: number;
  negative: number;
}

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: null;
  video_url: null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: number;
  source_name: string;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string[];
  ai_region: string[];
  ai_org: null;
  sentiment: string;
  sentiment_stats: Sentimentstats;
  duplicate: boolean;
}

export class NewsModel {
  private static instance: NewsModel;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to get the singleton instance
  public static getInstance(): NewsModel {
    if (!NewsModel.instance) {
      NewsModel.instance = new NewsModel();
    }
    return NewsModel.instance;
  }

  async fetchBreakingNews(): Promise<NewsArticle[]> {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=mm&language=en&image=1&size=5`
    );
    const data = await response.json();

    return data.results as NewsArticle[];
  }

  async fetchNews(): Promise<NewsArticle[]> {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=mm&language=en&image=1`
    );
    const data = await response.json();

    return data.results as NewsArticle[];
  }
}
