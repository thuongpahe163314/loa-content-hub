// File Types based on backend file module

export enum FileType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  AUDIO = "AUDIO"
}

export interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  thumbnailUrl?: string;
  [key: string]: any;
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  type: FileType;
  url: string;
  metadata?: FileMetadata;
  uploadedBy: string;
  createdAt: string;
}

export interface FileUploadResponse {
  file: UploadedFile;
  message: string;
}

export interface FileListResponse {
  data: UploadedFile[];
  total: number;
  page: number;
  limit: number;
}
