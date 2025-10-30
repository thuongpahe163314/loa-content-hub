import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CreateContentDto } from "@/types/content";

interface ContentBasicInfoProps {
  form: UseFormReturn<CreateContentDto>;
}

export function ContentBasicInfo({ form }: ContentBasicInfoProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Tiêu đề <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề nội dung (1-200 ký tự)"
            {...register("title", {
              required: "Tiêu đề là bắt buộc",
              minLength: { value: 1, message: "Tiêu đề phải có ít nhất 1 ký tự" },
              maxLength: { value: 200, message: "Tiêu đề không được vượt quá 200 ký tự" },
            })}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Tóm tắt</Label>
          <Textarea
            id="excerpt"
            placeholder="Nhập tóm tắt ngắn gọn (tối đa 500 ký tự)"
            rows={3}
            {...register("excerpt", {
              maxLength: { value: 500, message: "Tóm tắt không được vượt quá 500 ký tự" },
            })}
          />
          {errors.excerpt && (
            <p className="text-sm text-destructive">{errors.excerpt.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">
            Nội dung <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="content"
            placeholder="Nhập nội dung chi tiết (1-10000 ký tự)"
            rows={10}
            {...register("content", {
              required: "Nội dung là bắt buộc",
              minLength: { value: 1, message: "Nội dung phải có ít nhất 1 ký tự" },
              maxLength: { value: 10000, message: "Nội dung không được vượt quá 10000 ký tự" },
            })}
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
