import { ContentType, ContentStatus, Priority, NotificationType } from "@/types/content";
import type { Category } from "@/types/content";

// Sample categories
export const SAMPLE_CATEGORIES: Category[] = [
  {
    value: "thong-bao-hanh-chinh",
    label: "Thông báo hành chính",
    color: "#3B82F6",
    icon: "document",
  },
  {
    value: "su-kien-cong-dong",
    label: "Sự kiện cộng đồng",
    color: "#10B981",
    icon: "calendar",
  },
  {
    value: "cap-nhat-tin-tuc",
    label: "Cập nhật tin tức",
    color: "#F59E0B",
    icon: "newspaper",
  },
  {
    value: "canh-bao-khan-cap",
    label: "Cảnh báo khẩn cấp",
    color: "#EF4444",
    icon: "alert-triangle",
  },
  {
    value: "giao-duc-y-te",
    label: "Giáo dục - Y tế",
    color: "#8B5CF6",
    icon: "heart",
  },
  {
    value: "moi-truong",
    label: "Môi trường",
    color: "#059669",
    icon: "leaf",
  },
];

// Content type labels in Vietnamese
export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.ANNOUNCEMENT]: "Thông báo",
  [ContentType.NEWS]: "Tin tức",
  [ContentType.EVENT]: "Sự kiện",
  [ContentType.EMERGENCY]: "Khẩn cấp",
  [ContentType.NOTICE]: "Thông tin",
  [ContentType.PROMOTION]: "Quảng bá",
};

// Status labels in Vietnamese
export const STATUS_LABELS: Record<ContentStatus, string> = {
  [ContentStatus.DRAFT]: "Bản nháp",
  [ContentStatus.PUBLISHED]: "Đã xuất bản",
  [ContentStatus.ARCHIVED]: "Đã lưu trữ",
  [ContentStatus.SCHEDULED]: "Đã lên lịch",
};

// Priority labels in Vietnamese
export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.LOW]: "Thấp",
  [Priority.MEDIUM]: "Trung bình",
  [Priority.HIGH]: "Cao",
  [Priority.URGENT]: "Khẩn cấp",
};

// Notification type labels in Vietnamese
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NotificationType.CONTENT_PUBLISHED]: "Nội dung đã xuất bản",
  [NotificationType.CONTENT_UPDATED]: "Nội dung đã cập nhật",
  [NotificationType.EMERGENCY_ALERT]: "Cảnh báo khẩn cấp",
  [NotificationType.EVENT_REMINDER]: "Nhắc nhở sự kiện",
};

// File upload constraints
export const FILE_UPLOAD_LIMITS = {
  IMAGE: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png"],
  },
  VIDEO: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ["video/mp4"],
  },
  DOCUMENT: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["application/pdf"],
  },
};

// Common tags
export const COMMON_TAGS = [
  "Quan trọng",
  "Cần đọc",
  "Khẩn cấp",
  "Sự kiện",
  "Thông báo",
  "Tin mới",
  "Cộng đồng",
  "Y tế",
  "Giáo dục",
  "Môi trường",
  "An ninh",
  "Giao thông",
];
