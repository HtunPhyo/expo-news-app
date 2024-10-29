// src/controllers/NewsController.ts
import { NewsModel, NewsArticle } from "../models/NewsModel";

export class NewsController {
  private model: NewsModel;
  private updateView: (articles: NewsArticle[]) => void;
  private updateError: (error: string) => void; // Error handler

  constructor(
    updateView: (articles: NewsArticle[]) => void,
    updateError: (error: string) => void // Error handler passed in
  ) {
    this.model = NewsModel.getInstance();
    this.updateView = updateView;
    this.updateError = updateError;
  }

  async loadBreakingNews() {
    try {
      const articles = await this.model.fetchBreakingNews();
      this.updateView(articles);
    } catch (error) {
      console.error("Failed to fetch breaking news:", error);
      this.updateError("Failed to fetch breaking news. Please try again.");
    }
  }

  async loadNews() {
    try {
      const articles = await this.model.fetchNews();
      this.updateView(articles);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.updateError("Failed to fetch news. Please try again.");
    }
  }
}
