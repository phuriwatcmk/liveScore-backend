export function createSuccessResponse(data, message, pagination) {
    return {
        success: true,
        data,
        message,
        pagination,
    };
}
export function createErrorResponse(error, message, statusCode = 500) {
    return {
        success: false,
        error,
        message,
        statusCode,
    };
}
export function paginate(items, page = 1, limit = 10) {
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
