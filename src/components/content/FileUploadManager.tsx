import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { fileService } from "@/services/fileService";
import { toast } from "sonner";

interface FileUploadManagerProps {
  onFilesUploaded: (urls: string[]) => void;
  onClose: () => void;
}

interface UploadFile {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

export function FileUploadManager({
  onFilesUploaded,
  onClose,
}: FileUploadManagerProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const uploadMutation = useMutation({
    mutationFn: fileService.uploadFile,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = selectedFiles.map((file) => ({
      file,
      progress: 0,
      status: "pending" as const,
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleUpload = async () => {
    const pendingFiles = files.filter((f) => f.status === "pending");
    
    for (const fileItem of pendingFiles) {
      const index = files.indexOf(fileItem);
      
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: "uploading", progress: 50 };
        return updated;
      });

      try {
        const response = await uploadMutation.mutateAsync(fileItem.file);
        
        setFiles((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: "success",
            progress: 100,
            url: response.file.url,
          };
          return updated;
        });
      } catch (error: any) {
        setFiles((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: "error",
            progress: 0,
            error: error.message || "Upload failed",
          };
          return updated;
        });
      }
    }
  };

  const handleComplete = () => {
    const uploadedUrls = files
      .filter((f) => f.status === "success" && f.url)
      .map((f) => f.url!);
    
    if (uploadedUrls.length > 0) {
      onFilesUploaded(uploadedUrls);
      toast.success(`Đã tải lên ${uploadedUrls.length} tệp thành công`);
    }
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const successCount = files.filter((f) => f.status === "success").length;
  const canComplete = successCount > 0;

  return (
    <Card className="border-primary">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Quản lý tải tệp lên</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="flex-1"
            accept="image/jpeg,image/png,video/mp4,application/pdf"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((fileItem, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {fileItem.file.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {fileItem.status === "success" && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      {fileItem.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      {fileItem.status !== "uploading" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  {fileItem.status === "uploading" && (
                    <Progress value={fileItem.progress} className="mt-2" />
                  )}
                  {fileItem.error && (
                    <div className="mt-1 text-xs text-destructive">
                      {fileItem.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          {!canComplete && files.length > 0 && (
            <Button onClick={handleUpload} disabled={uploadMutation.isPending}>
              <Upload className="mr-2 h-4 w-4" />
              Tải lên
            </Button>
          )}
          {canComplete && (
            <Button onClick={handleComplete}>
              Hoàn tất ({successCount} tệp)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
