import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { contentService } from "@/services/contentService";
import { toast } from "sonner";
import { ContentStatus, Priority } from "@/types/content";

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: content, isLoading } = useQuery({
    queryKey: ["content", id],
    queryFn: () => contentService.getContentById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => contentService.deleteContent(id!),
    onSuccess: () => {
      toast.success("Đã xóa nội dung thành công");
      navigate("/admin/content");
    },
    onError: (error: any) => {
      toast.error(error.message || "Không thể xóa nội dung");
    },
  });

  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
      deleteMutation.mutate();
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/content/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Đã sao chép liên kết");
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium">Không tìm thấy nội dung</div>
          <Button onClick={() => navigate("/admin/content")}>
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/content")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chi tiết nội dung</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Đường dẫn: /content/{id}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Sao chép liên kết
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/content/${id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{content.title}</CardTitle>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getStatusBadge(content.status)}
                    {getPriorityBadge(content.priority)}
                    <Badge variant="outline">{content.type}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.excerpt && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm italic">{content.excerpt}</p>
                </div>
              )}

              {content.featuredImage && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={content.featuredImage}
                    alt={content.title}
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{content.content}</p>
              </div>
            </CardContent>
          </Card>

          {content.attachments && content.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tệp đính kèm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {content.attachments.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent"
                    >
                      <div className="flex-1 truncate text-sm">{url}</div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {content.metadata && Object.keys(content.metadata).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
                  {JSON.stringify(content.metadata, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Danh mục
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: content.category.color }}
                  />
                  <span>{content.category.label}</span>
                </div>
              </div>

              {content.tags && content.tags.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Thẻ tag
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Tác giả
                </div>
                <div className="mt-1">{content.authorName || content.authorId}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Ngày tạo
                </div>
                <div className="mt-1">
                  {new Date(content.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Cập nhật lần cuối
                </div>
                <div className="mt-1">
                  {new Date(content.updatedAt).toLocaleString("vi-VN")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
