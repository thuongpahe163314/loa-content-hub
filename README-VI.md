# Loa Phường - Hệ thống Quản trị Nội dung

Hệ thống quản trị nội dung thông báo cộng đồng với giao diện hiện đại, thân thiện người dùng.

## Tính năng chính

### ✅ Quản lý Nội dung đầy đủ
- **Danh sách nội dung**: Xem, lọc, tìm kiếm và sắp xếp nội dung
- **Tạo nội dung**: Form đầy đủ với validation, hỗ trợ nhiều loại nội dung
- **Chỉnh sửa nội dung**: Cập nhật thông tin nội dung dễ dàng
- **Xem chi tiết**: Hiển thị đầy đủ thông tin nội dung với deep link `/content/:id`
- **Xóa nội dung**: Xóa đơn lẻ hoặc hàng loạt với xác nhận

### 📁 Quản lý File
- **Upload file**: Hỗ trợ ảnh (JPEG, PNG), video (MP4), tài liệu (PDF)
- **Giới hạn kích thước**: 10MB (ảnh), 50MB (video), 5MB (tài liệu)
- **Preview**: Xem trước ảnh và tài liệu
- **Quản lý đính kèm**: Thêm, xóa file đính kèm cho nội dung

### 🔔 Tùy chọn Thông báo
- **Gửi thông báo tự động**: Khi tạo nội dung mới
- **Chọn đối tượng**: Tất cả, theo nhóm, hoặc người dùng cụ thể
- **Đa kênh**: Email và/hoặc trong ứng dụng
- **Tích hợp Notification Orchestrator**: Publish message qua RabbitMQ

### 🎨 Phân loại và Tổ chức
- **Loại nội dung**: ANNOUNCEMENT, NEWS, EVENT, EMERGENCY, NOTICE, PROMOTION
- **Trạng thái**: DRAFT, PUBLISHED, ARCHIVED, SCHEDULED
- **Mức ưu tiên**: LOW, MEDIUM, HIGH, URGENT
- **Danh mục**: Tùy chỉnh với màu sắc và icon
- **Tags**: Gắn thẻ để dễ tìm kiếm

### 🔍 Bộ lọc và Tìm kiếm
- Tìm kiếm toàn văn
- Lọc theo trạng thái, loại, danh mục, tác giả, tags
- Lọc theo khoảng thời gian
- Sắp xếp theo nhiều tiêu chí
- Phân trang linh hoạt

### 🎨 Giao diện
- **Design System**: Màu xanh dương chủ đạo (tin cậy) + cam (năng động)
- **Responsive**: Tối ưu cho mọi kích thước màn hình
- **Dark Mode**: Hỗ trợ chế độ tối
- **Sidebar Navigation**: Điều hướng dễ dàng
- **Toast Notifications**: Thông báo hành động rõ ràng

## Công nghệ sử dụng

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS với custom design system
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Form Management**: React Hook Form
- **Routing**: React Router v6
- **Icons**: Lucide React

## Cài đặt

### Yêu cầu
- Node.js 18+ và npm

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình môi trường**
```bash
cp .env.example .env
```

Chỉnh sửa file `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. **Chạy development server**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:8080`

## Cấu trúc thư mục

```
src/
├── components/          # Components tái sử dụng
│   ├── content/        # Components quản lý nội dung
│   │   ├── ContentBasicInfo.tsx
│   │   ├── ContentClassification.tsx
│   │   ├── ContentFilters.tsx
│   │   ├── ContentMedia.tsx
│   │   ├── ContentMetadata.tsx
│   │   ├── ContentNotification.tsx
│   │   └── FileUploadManager.tsx
│   ├── layout/         # Layout components
│   │   ├── AppHeader.tsx
│   │   ├── AppLayout.tsx
│   │   └── AppSidebar.tsx
│   └── ui/            # shadcn/ui components
├── pages/             # Pages
│   └── admin/
│       ├── Dashboard.tsx
│       └── content/
│           ├── ContentDetail.tsx
│           ├── ContentForm.tsx
│           └── ContentList.tsx
├── services/          # API services
│   ├── contentService.ts
│   └── fileService.ts
├── types/             # TypeScript types
│   ├── content.ts
│   └── file.ts
├── lib/              # Utilities
│   ├── api.ts        # API client
│   └── utils.ts
├── App.tsx           # App root
├── index.css         # Global styles + Design system
└── main.tsx          # Entry point
```

## API Endpoints

### Content Endpoints

```typescript
// Lấy danh sách nội dung (có filter, sort, pagination)
GET /api/v1/content
Query params: page, limit, status, type, category, authorId, tags, 
              isPublished, search, dateFrom, dateTo, sortField, sortDirection

// Lấy chi tiết nội dung
GET /api/v1/content/:id

// Tạo nội dung mới (có thể kèm notificationOptions)
POST /api/v1/content
Body: CreateContentDto

// Cập nhật nội dung
PUT /api/v1/content/:id
Body: UpdateContentDto

// Xóa nội dung
DELETE /api/v1/content/:id

// Xóa hàng loạt
POST /api/v1/content/bulk-delete
Body: { ids: string[] }
```

### File Endpoints

```typescript
// Upload file
POST /api/v1/files/upload
Content-Type: multipart/form-data
Field: file

// Lấy danh sách files
GET /api/v1/files
Query params: page, limit

// Lấy thông tin file
GET /api/v1/files/:id

// Download file
GET /api/v1/files/:id/download

// Preview file
GET /api/v1/files/:id/preview

// Xóa file
DELETE /api/v1/files/:id
```

## Validation Rules

### CreateContentDto
- `title`: Bắt buộc, 1-200 ký tự
- `content`: Bắt buộc, 1-10000 ký tự
- `excerpt`: Tùy chọn, tối đa 500 ký tự
- `type`: Enum ContentType (bắt buộc)
- `category`: Object với value, label, color, icon
- `status`: Enum ContentStatus (mặc định: DRAFT)
- `priority`: Enum Priority (mặc định: MEDIUM)
- `tags`: Mảng string
- `featuredImage`: URL string
- `attachments`: Mảng URL strings
- `metadata`: Object tùy chỉnh
- `notificationOptions`: Object (chỉ khi tạo mới)
  - `enabled`: boolean
  - `type`: Enum NotificationType (bắt buộc khi enabled=true)
  - `audience`: Object (bắt buộc ít nhất 1 tiêu chí khi enabled=true)
    - `all`: boolean
    - `groupIds`: string[]
    - `userIds`: string[]
  - `channels`: Array of 'email' | 'in_app'
  - `scheduleAt`: string | null

### File Upload Constraints
- **Allowed types**: image/jpeg, image/png, video/mp4, application/pdf
- **Size limits**:
  - Images: 10MB
  - Videos: 50MB
  - Documents: 5MB

## Quyền hạn (Roles)

- **ADMIN**: Toàn quyền quản lý
- **EDITOR**: Tạo, sửa, xóa nội dung
- **CONTENT_CREATOR**: Tạo và sửa nội dung của mình
- **VIEWER**: Chỉ xem

## Notification Orchestrator

Khi tạo nội dung với `notificationOptions.enabled = true`:
- Frontend gửi request tới backend với notification options
- Backend publish message qua RabbitMQ
- Notification Orchestrator xử lý và gửi thông báo
- Deep link trong notification: `/content/:id`

## Scripts

```bash
# Development
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Tùy chỉnh Design System

Design system được định nghĩa trong `src/index.css` và `tailwind.config.ts`.

### Màu chủ đạo
- **Primary**: Xanh dương (tin cậy, chuyên nghiệp)
- **Secondary**: Cam (thông báo, năng động)
- **Success**: Xanh lá
- **Warning**: Vàng
- **Destructive**: Đỏ

### Tùy chỉnh màu
Chỉnh sửa CSS variables trong `src/index.css`:
```css
:root {
  --primary: 217 91% 60%;
  --secondary: 27 96% 61%;
  /* ... */
}
```

## Troubleshooting

### API không kết nối được
- Kiểm tra `VITE_API_BASE_URL` trong file `.env`
- Đảm bảo backend đang chạy
- Kiểm tra CORS settings

### Upload file thất bại
- Kiểm tra file size và type
- Xác nhận backend hỗ trợ multipart/form-data
- Kiểm tra permissions

### Token hết hạn
- Token được lưu trong localStorage với key `auth_token`
- Implement refresh token logic nếu cần

## Phát triển thêm

### Thêm loại nội dung mới
1. Cập nhật enum `ContentType` trong `src/types/content.ts`
2. Backend cũng cần cập nhật tương ứng

### Thêm field mới cho Content
1. Cập nhật interfaces trong `src/types/content.ts`
2. Cập nhật form components trong `src/components/content/`
3. Backend cần cập nhật DTOs

### Thêm tính năng filter
1. Cập nhật `ContentQueryParams` trong `src/types/content.ts`
2. Cập nhật `ContentFilters` component
3. Backend cần hỗ trợ query parameter mới

## License

Dự án nội bộ - All Rights Reserved

## Liên hệ

Để biết thêm thông tin, liên hệ team phát triển.
