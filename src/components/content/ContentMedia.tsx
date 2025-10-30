import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, File as FileIcon } from "lucide-react";
import type { CreateContentDto } from "@/types/content";
import { FileUploadManager } from "./FileUploadManager";
import { useState } from "react";

interface ContentMediaProps {
  form: UseFormReturn<CreateContentDto>;
}

export function ContentMedia({ form }: ContentMediaProps) {
  const { watch, setValue } = form;
  const [showUploadManager, setShowUploadManager] = useState(false);
  const featuredImage = watch("featuredImage");
  const attachments = watch("attachments") || [];

  const handleFilesUploaded = (urls: string[]) => {
    setValue("attachments", [...attachments, ...urls]);
    setShowUploadManager(false);
  };

  const handleRemoveAttachment = (url: string) => {
    setValue(
      "attachments",
      attachments.filter((a) => a !== url)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ảnh và Tệp đính kèm</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Ảnh đại diện</Label>
          <div className="flex gap-2">
            <Input
              placeholder="URL ảnh đại diện"
              value={featuredImage || ""}
              onChange={(e) => setValue("featuredImage", e.target.value)}
            />
          </div>
          {featuredImage && (
            <div className="relative mt-2 w-full max-w-md overflow-hidden rounded-lg border">
              <img
                src={featuredImage}
                alt="Featured"
                className="h-48 w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setValue("featuredImage", "")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Tệp đính kèm</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUploadManager(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Tải tệp lên
            </Button>
          </div>

          {attachments.length > 0 && (
            <div className="grid gap-2 md:grid-cols-2">
              {attachments.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  {url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <ImageIcon className="h-5 w-5 text-primary" />
                  ) : (
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="flex-1 truncate text-sm">{url}</div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAttachment(url)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {showUploadManager && (
          <FileUploadManager
            onFilesUploaded={handleFilesUploaded}
            onClose={() => setShowUploadManager(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
