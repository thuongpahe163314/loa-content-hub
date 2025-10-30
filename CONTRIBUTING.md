# Hướng dẫn đóng góp

Cảm ơn bạn quan tâm đến việc đóng góp cho dự án Loa Phường CMS!

## Quy trình đóng góp

1. **Fork repository** và tạo branch mới từ `main`
2. **Viết code** tuân thủ coding standards
3. **Test kỹ** các thay đổi của bạn
4. **Commit** với message rõ ràng
5. **Tạo Pull Request** với mô tả chi tiết

## Coding Standards

### TypeScript
- Luôn định nghĩa types/interfaces rõ ràng
- Không dùng `any` trừ khi thực sự cần thiết
- Sử dụng TypeScript strict mode

### React
- Functional components với hooks
- Prop drilling tối đa 2 levels, sau đó dùng context/state management
- Memoize khi cần thiết với `useMemo`, `useCallback`

### Styling
- **KHÔNG được** dùng inline styles trực tiếp
- **KHÔNG được** dùng classes như `text-white`, `bg-blue-500` trong components
- **LUÔN** sử dụng design system tokens từ `index.css`
- Tạo variants trong components nếu cần custom styles

### File Organization
- Một component = một file
- Đặt tên file theo PascalCase
- Group related files trong cùng folder

### Naming Conventions
- **Components**: PascalCase (`ContentList.tsx`)
- **Hooks**: camelCase với prefix `use` (`useContent.ts`)
- **Types**: PascalCase (`ContentType`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Functions**: camelCase (`handleSubmit`)

## Git Commit Messages

Format: `<type>(<scope>): <subject>`

Types:
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Cập nhật documentation
- `style`: Thay đổi styling (không ảnh hưởng code logic)
- `refactor`: Refactor code
- `test`: Thêm/sửa tests
- `chore`: Công việc maintenance

Ví dụ:
```
feat(content): add bulk delete functionality
fix(upload): handle file size validation correctly
docs(readme): update API endpoints section
```

## Testing

- Viết unit tests cho business logic
- Viết integration tests cho API calls
- Test UI components với user interactions
- Chạy `npm run lint` trước khi commit

## Pull Request Guidelines

### Title
Rõ ràng, súc tích, mô tả được thay đổi chính

### Description
- **What**: Thay đổi gì?
- **Why**: Tại sao cần thay đổi?
- **How**: Cách implement?
- **Testing**: Đã test như thế nào?
- **Screenshots**: Nếu có thay đổi UI

### Checklist
- [ ] Code tuân thủ coding standards
- [ ] Đã test kỹ các thay đổi
- [ ] Documentation đã được cập nhật
- [ ] Không có console.log/debugger còn sót lại
- [ ] Build thành công (`npm run build`)

## Design System Guidelines

### Khi thêm màu mới
1. Thêm CSS variable vào `src/index.css`
2. Thêm Tailwind color vào `tailwind.config.ts`
3. Document trong README

### Khi tạo component variant mới
1. Thêm variant vào component (ví dụ: `button.tsx`)
2. Sử dụng design system tokens
3. Test với cả light và dark mode

## API Integration

### Khi thêm endpoint mới
1. Update types trong `src/types/`
2. Thêm service method trong `src/services/`
3. Document trong README-VI.md
4. Handle errors properly

### Error Handling
- Luôn có try-catch cho async operations
- Show user-friendly error messages (tiếng Việt)
- Log errors cho debugging

## Questions?

Nếu có thắc mắc, tạo issue hoặc liên hệ team lead.

Cảm ơn bạn đã đóng góp! 🎉
