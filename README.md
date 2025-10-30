# Loa Phường Service - Content Management System

Hệ thống quản trị nội dung thông báo cộng đồng hiện đại, được xây dựng với React, TypeScript và Tailwind CSS.

![Loa Phường CMS](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Loa+Phuong+CMS)

## ✨ Tính năng nổi bật

- 📝 **Quản lý nội dung đầy đủ**: CRUD hoàn chỉnh với validation, filter, sort, pagination
- 📁 **Upload & quản lý file**: Hỗ trợ ảnh, video, PDF với preview
- 🔔 **Hệ thống thông báo tích hợp**: Gửi thông báo qua email và in-app
- 🎨 **Giao diện đẹp mắt**: Design system chuyên nghiệp với dark mode
- 🔍 **Tìm kiếm & lọc mạnh mẽ**: Full-text search, multi-filter
- 📱 **Responsive 100%**: Tối ưu cho mọi thiết bị
- 🚀 **Performance cao**: React Query caching, lazy loading

## 🚀 Bắt đầu nhanh

### Yêu cầu
- Node.js 18+
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Cài đặt dependencies
npm install

# Cấu hình môi trường
cp .env.example .env
# Chỉnh sửa VITE_API_BASE_URL trong .env

# Khởi động development server
npm run dev
```

Truy cập `http://localhost:8080` để xem ứng dụng.

## 📖 Tài liệu chi tiết

Xem [README-VI.md](./README-VI.md) để biết:
- Hướng dẫn sử dụng chi tiết
- Cấu trúc dự án
- API endpoints
- Validation rules
- Hướng dẫn phát triển

## 🛠️ Công nghệ

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Data fetching & caching
- **React Hook Form** - Form management
- **React Router v6** - Routing

## 📁 Cấu trúc

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript types
├── lib/          # Utilities
└── index.css     # Global styles & design system
```

## 🎨 Design System

Hệ thống sử dụng design tokens định nghĩa trong `src/index.css`:
- **Primary**: Blue (#3B82F6) - Tin cậy, chuyên nghiệp
- **Secondary**: Orange (#FB923C) - Năng động, thông báo
- **Success**: Green - Thành công
- **Warning**: Yellow - Cảnh báo
- **Destructive**: Red - Nguy hiểm

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Đóng góp

Vui lòng đọc [CONTRIBUTING.md](./CONTRIBUTING.md) để biết quy trình đóng góp.

## 📄 License

Dự án nội bộ - All Rights Reserved

## 📞 Liên hệ

Để biết thêm thông tin, liên hệ team phát triển.

---

Được xây dựng với ❤️ bởi Loa Phường Team
