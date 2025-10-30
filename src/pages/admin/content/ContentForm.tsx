import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentService } from "@/services/contentService";
import { toast } from "sonner";
import { ContentBasicInfo } from "@/components/content/ContentBasicInfo";
import { ContentClassification } from "@/components/content/ContentClassification";
import { ContentMedia } from "@/components/content/ContentMedia";
import { ContentMetadata } from "@/components/content/ContentMetadata";
import { ContentNotification } from "@/components/content/ContentNotification";
import type { CreateContentDto, UpdateContentDto } from "@/types/content";
import { ContentStatus, ContentType, Priority } from "@/types/content";

export default function ContentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [activeTab, setActiveTab] = useState("basic");

  const { data: existingContent } = useQuery({
    queryKey: ["content", id],
    queryFn: () => contentService.getContentById(id!),
    enabled: isEdit,
  });

  const form = useForm<CreateContentDto>({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      type: ContentType.ANNOUNCEMENT,
      status: ContentStatus.DRAFT,
      priority: Priority.MEDIUM,
      tags: [],
      attachments: [],
      category: {
        value: "",
        label: "",
        color: "#3B82F6",
        icon: "document",
      },
    },
  });

  useEffect(() => {
    if (existingContent) {
      form.reset(existingContent);
    }
  }, [existingContent, form]);

  const createMutation = useMutation({
    mutationFn: (data: CreateContentDto) => contentService.createContent(data),
    onSuccess: (data) => {
      toast.success("Đã tạo nội dung thành công");
      if (data.id) {
        navigate(`/admin/content/${data.id}`);
      } else {
        navigate("/admin/content");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Không thể tạo nội dung");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateContentDto) =>
      contentService.updateContent(id!, data),
    onSuccess: () => {
      toast.success("Đã cập nhật nội dung thành công");
      navigate(`/admin/content/${id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Không thể cập nhật nội dung");
    },
  });

  const onSubmit = (data: CreateContentDto) => {
    if (isEdit) {
      const { notificationOptions, ...updateData } = data;
      updateMutation.mutate(updateData);
    } else {
      createMutation.mutate(data);
    }
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
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Chỉnh sửa nội dung" : "Tạo nội dung mới"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit
                ? "Cập nhật thông tin nội dung"
                : "Điền thông tin để tạo nội dung mới"}
            </p>
          </div>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={createMutation.isPending || updateMutation.isPending}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isEdit ? "Cập nhật" : "Tạo mới"}
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Tổng quan</TabsTrigger>
            <TabsTrigger value="classification">Phân loại</TabsTrigger>
            <TabsTrigger value="media">Ảnh & Tệp</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            {!isEdit && <TabsTrigger value="notification">Thông báo</TabsTrigger>}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic">
              <ContentBasicInfo form={form} />
            </TabsContent>

            <TabsContent value="classification">
              <ContentClassification form={form} />
            </TabsContent>

            <TabsContent value="media">
              <ContentMedia form={form} />
            </TabsContent>

            <TabsContent value="metadata">
              <ContentMetadata form={form} />
            </TabsContent>

            {!isEdit && (
              <TabsContent value="notification">
                <ContentNotification form={form} />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </form>
    </div>
  );
}
