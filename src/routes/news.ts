import { Hono } from "hono";
import { mockNews } from "../data/mockData";
import {
  createSuccessResponse,
  createErrorResponse,
  paginate,
} from "../utils/response";

const news = new Hono();

// GET /news - Get news with filters
news.get("/", (c) => {
  try {
    const query = c.req.query();
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const category = query.category;
    const tags = query.tags;
    const search = query.search;

    let filteredNews = [...mockNews];

    // Filter by category
    if (category) {
      filteredNews = filteredNews.filter((article) =>
        article.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by tags
    if (tags) {
      const tagList = tags.split(",").map((tag) => tag.trim().toLowerCase());
      filteredNews = filteredNews.filter((article) =>
        article.tags.some((tag) =>
          tagList.some((searchTag) => tag.toLowerCase().includes(searchTag))
        )
      );
    }

    // Filter by search term (title and summary)
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredNews = filteredNews.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.summary.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by date (most recent first)
    filteredNews.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const { data, pagination } = paginate(filteredNews, page, limit);

    return c.json(
      createSuccessResponse(data, "News retrieved successfully", pagination)
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve news"),
      500
    );
  }
});

// GET /news/categories - Get all news categories
news.get("/categories", (c) => {
  try {
    const categories = [
      ...new Set(mockNews.map((article) => article.category)),
    ];

    return c.json(
      createSuccessResponse(
        categories,
        "News categories retrieved successfully"
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to retrieve news categories"
      ),
      500
    );
  }
});

// GET /news/tags - Get all news tags
news.get("/tags", (c) => {
  try {
    const allTags = mockNews.flatMap((article) => article.tags);
    const uniqueTags = [...new Set(allTags)];

    return c.json(
      createSuccessResponse(uniqueTags, "News tags retrieved successfully")
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve news tags"),
      500
    );
  }
});

// GET /news/trending - Get trending news (most viewed)
news.get("/trending", (c) => {
  try {
    const query = c.req.query();
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;

    // Sort by views (descending)
    const trendingNews = [...mockNews].sort((a, b) => b.views - a.views);

    const { data, pagination } = paginate(trendingNews, page, limit);

    return c.json(
      createSuccessResponse(
        data,
        "Trending news retrieved successfully",
        pagination
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve trending news"),
      500
    );
  }
});

// GET /news/:newsId - Get specific news article
news.get("/:newsId", (c) => {
  try {
    const newsId = parseInt(c.req.param("newsId"), 10);

    const article = mockNews.find((n) => n.id === newsId);

    if (!article) {
      return c.json(
        createErrorResponse(
          "NOT_FOUND",
          `News article with ID ${newsId} not found`
        ),
        404
      );
    }

    // Simulate view increment (in real app, this would update database)
    const articleWithIncrementedViews = {
      ...article,
      views: article.views + 1,
    };

    return c.json(
      createSuccessResponse(
        articleWithIncrementedViews,
        "News article retrieved successfully"
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve news article"),
      500
    );
  }
});

// GET /news/:newsId/related - Get related news articles
news.get("/:newsId/related", (c) => {
  try {
    const newsId = parseInt(c.req.param("newsId"), 10);

    const article = mockNews.find((n) => n.id === newsId);

    if (!article) {
      return c.json(
        createErrorResponse(
          "NOT_FOUND",
          `News article with ID ${newsId} not found`
        ),
        404
      );
    }

    // Find related articles based on tags and category
    const relatedNews = mockNews
      .filter((n) => n.id !== newsId) // Exclude current article
      .filter(
        (n) =>
          n.category === article.category || // Same category
          n.tags.some((tag) => article.tags.includes(tag)) // Shared tags
      )
      .sort((a, b) => {
        // Sort by relevance (number of shared tags)
        const aSharedTags = a.tags.filter((tag) =>
          article.tags.includes(tag)
        ).length;
        const bSharedTags = b.tags.filter((tag) =>
          article.tags.includes(tag)
        ).length;
        return bSharedTags - aSharedTags;
      })
      .slice(0, 5); // Limit to 5 related articles

    return c.json(
      createSuccessResponse(
        relatedNews,
        "Related news articles retrieved successfully"
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to retrieve related news articles"
      ),
      500
    );
  }
});

export default news;
