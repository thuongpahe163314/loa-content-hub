import { apiClient } from "@/lib/api";
import type {
  FileUploadResponse,
  FileListResponse,
  UploadedFile,
} from "@/types/file";

export const fileService = {
  // Upload file
  async uploadFile(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<FileUploadResponse>("/files/upload", formData);
  },

  // Get file list
  async getFiles(params?: {
    page?: number;
    limit?: number;
  }): Promise<FileListResponse> {
    return apiClient.get<FileListResponse>("/files", params);
  },

  // Get file by ID
  async getFileById(id: string): Promise<UploadedFile> {
    return apiClient.get<UploadedFile>(`/files/${id}`);
  },

  // Get file download URL
  getDownloadUrl(id: string): string {
    return `${apiClient["baseURL"]}/files/${id}/download`;
  },

  // Get file preview URL
  getPreviewUrl(id: string): string {
    return `${apiClient["baseURL"]}/files/${id}/preview`;
  },

  // Delete file
  async deleteFile(id: string): Promise<void> {
    return apiClient.delete<void>(`/files/${id}`);
  },
};
