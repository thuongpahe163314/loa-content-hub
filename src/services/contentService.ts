import { apiClient } from "@/lib/api";
import type {
  Content,
  ContentListResponse,
  CreateContentDto,
  UpdateContentDto,
  ContentQueryParams,
} from "@/types/content";

export const contentService = {
  // Get list of contents with filters
  async getContents(params?: ContentQueryParams): Promise<ContentListResponse> {
    return apiClient.get<ContentListResponse>("/content", params as any);
  },

  // Get single content by ID
  async getContentById(id: string): Promise<Content> {
    return apiClient.get<Content>(`/content/${id}`);
  },

  // Create new content
  async createContent(data: CreateContentDto): Promise<Content> {
    return apiClient.post<Content>("/content", data);
  },

  // Update existing content
  async updateContent(id: string, data: UpdateContentDto): Promise<Content> {
    return apiClient.put<Content>(`/content/${id}`, data);
  },

  // Delete content
  async deleteContent(id: string): Promise<void> {
    return apiClient.delete<void>(`/content/${id}`);
  },

  // Bulk delete contents
  async bulkDeleteContents(ids: string[]): Promise<void> {
    return apiClient.post<void>("/content/bulk-delete", { ids });
  },
};
