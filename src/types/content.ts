// Content Types and Enums based on backend DTOs

export enum ContentType {
  ANNOUNCEMENT = "ANNOUNCEMENT",
  NEWS = "NEWS",
  EVENT = "EVENT",
  EMERGENCY = "EMERGENCY",
  NOTICE = "NOTICE",
  PROMOTION = "PROMOTION"
}

export enum ContentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  SCHEDULED = "SCHEDULED"
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum NotificationType {
  CONTENT_PUBLISHED = "CONTENT_PUBLISHED",
  CONTENT_UPDATED = "CONTENT_UPDATED",
  EMERGENCY_ALERT = "EMERGENCY_ALERT",
  EVENT_REMINDER = "EVENT_REMINDER"
}

export interface Category {
  value: string;
  label: string;
  color?: string;
  icon?: string;
}

export interface NotificationAudience {
  all?: boolean;
  groupIds?: string[];
  userIds?: string[];
}

export interface NotificationOptions {
  enabled: boolean;
  type?: NotificationType;
  audience?: NotificationAudience;
  channels?: ("email" | "in_app")[];
  scheduleAt?: string | null;
}

export interface ContentMetadata {
  [key: string]: any;
}

export interface Content {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  type: ContentType;
  category: Category;
  status: ContentStatus;
  priority: Priority;
  tags: string[];
  featuredImage?: string;
  attachments: string[];
  metadata?: ContentMetadata;
  authorId: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentDto {
  title: string;
  content: string;
  excerpt?: string;
  type: ContentType;
  category: Category;
  status?: ContentStatus;
  priority?: Priority;
  tags?: string[];
  featuredImage?: string;
  attachments?: string[];
  metadata?: ContentMetadata;
  notificationOptions?: NotificationOptions;
}

export interface UpdateContentDto {
  title?: string;
  content?: string;
  excerpt?: string;
  type?: ContentType;
  category?: Category;
  status?: ContentStatus;
  priority?: Priority;
  tags?: string[];
  featuredImage?: string;
  attachments?: string[];
  metadata?: ContentMetadata;
}

export interface ContentQueryParams {
  page?: number;
  limit?: number;
  status?: ContentStatus;
  type?: ContentType;
  category?: string;
  authorId?: string;
  tags?: string[];
  isPublished?: boolean;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}

export interface ContentListResponse {
  data: Content[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
