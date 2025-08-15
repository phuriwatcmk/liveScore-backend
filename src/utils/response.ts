import type { ApiResponse, ErrorResponse } from "../types/index.js";

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    pagination,
  };
}

export function createErrorResponse(
  error: string,
  message: string,
  statusCode: number = 500
): ErrorResponse {
  return {
    success: false,
    error,
    message,
    statusCode,
  };
}

export function paginate<T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
    },
  };
}
