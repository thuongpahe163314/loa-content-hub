import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ContentStatus, ContentType, Priority } from "@/types/content";
import type { CreateContentDto } from "@/types/content";
import { useState } from "react";

interface ContentClassificationProps {
  form: UseFormReturn<CreateContentDto>;
}

export function ContentClassification({ form }: ContentClassificationProps) {
  const { watch, setValue } = form;
  const [tagInput, setTagInput] = useState("");
  const tags = watch("tags") || [];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân loại nội dung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Loại nội dung</Label>
            <Select
              value={watch("type")}
              onValueChange={(value) => setValue("type", value as ContentType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ContentType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={watch("status")}
              onValueChange={(value) => setValue("status", value as ContentStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ContentStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mức độ ưu tiên</Label>
            <Select
              value={watch("priority")}
              onValueChange={(value) => setValue("priority", value as Priority)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Priority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Danh mục</Label>
            <Input
              placeholder="Nhập tên danh mục"
              value={watch("category.label")}
              onChange={(e) =>
                setValue("category", {
                  ...watch("category"),
                  value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  label: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Thẻ tag</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập tag và nhấn Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary-hover"
            >
              Thêm
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
