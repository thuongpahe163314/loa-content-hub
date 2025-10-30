import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Download, Trash2, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { contentService } from "@/services/contentService";
import { ContentStatus, ContentType, Priority } from "@/types/content";
import { ContentFilters } from "@/components/content/ContentFilters";
import { toast } from "sonner";
import type { ContentQueryParams } from "@/types/content";

export default function ContentList() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<ContentQueryParams>({
    page: 1,
    limit: 10,
    sortField: "createdAt",
    sortDirection: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contents", filters],
    queryFn: () => contentService.getContents(filters),
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nội dung này?")) return;
    
    try {
      await contentService.deleteContent(id);
      toast.success("Đã xóa nội dung thành công");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa nội dung");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} nội dung?`)) return;

    try {
      await contentService.bulkDeleteContents(selectedIds);
      toast.success(`Đã xóa ${selectedIds.length} nội dung thành công`);
      setSelectedIds([]);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa nội dung");
    }
  };

  const getStatusBadge = (status: ContentStatus) => {
    const variants: Record<ContentStatus, "default" | "secondary" | "destructive" | "outline"> = {
      [ContentStatus.PUBLISHED]: "default",
      [ContentStatus.DRAFT]: "secondary",
      [ContentStatus.ARCHIVED]: "outline",
      [ContentStatus.SCHEDULED]: "default",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Priority) => {
    const colors: Record<Priority, string> = {
      [Priority.LOW]: "bg-muted text-muted-foreground",
      [Priority.MEDIUM]: "bg-primary/10 text-primary",
      [Priority.HIGH]: "bg-warning/10 text-warning",
      [Priority.URGENT]: "bg-destructive/10 text-destructive",
    };
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Nội dung</h1>
          <p className="text-muted-foreground">
            Tạo, chỉnh sửa và quản lý nội dung thông báo
          </p>
        </div>
        <Button onClick={() => navigate("/admin/content/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo nội dung mới
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nội dung..."
                className="pl-10"
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value, page: 1 })
                }
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Đã chọn {selectedIds.length}
              </span>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </Button>
            </div>
          )}
        </div>

        {showFilters && (
          <ContentFilters
            filters={filters}
            onChange={(newFilters) => setFilters({ ...filters, ...newFilters, page: 1 })}
          />
        )}
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    data?.data.length > 0 &&
                    selectedIds.length === data?.data.length
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedIds(data?.data.map((c) => c.id) || []);
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ưu tiên</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Không tìm thấy nội dung nào
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds([...selectedIds, content.id]);
                        } else {
                          setSelectedIds(
                            selectedIds.filter((id) => id !== content.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>{content.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: content.category.color }}
                      />
                      {content.category.label}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(content.status)}</TableCell>
                  <TableCell>{getPriorityBadge(content.priority)}</TableCell>
                  <TableCell>{content.authorName || content.authorId}</TableCell>
                  <TableCell>
                    {new Date(content.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/content/${content.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/content/${content.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(content.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Hiển thị {(data.page - 1) * data.limit + 1} -{" "}
              {Math.min(data.page * data.limit, data.total)} trong tổng số{" "}
              {data.total}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.page === 1}
                onClick={() => setFilters({ ...filters, page: data.page - 1 })}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={data.page >= data.totalPages}
                onClick={() => setFilters({ ...filters, page: data.page + 1 })}
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
