export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

export interface ApiError {
  status_code: number
  message: string
  path: string
  timestamp: string
}
