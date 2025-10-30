import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CreateContentDto } from "@/types/content";
import { useState } from "react";

interface ContentMetadataProps {
  form: UseFormReturn<CreateContentDto>;
}

export function ContentMetadata({ form }: ContentMetadataProps) {
  const { watch, setValue } = form;
  const metadata = watch("metadata") || {};
  const [jsonString, setJsonString] = useState(
    JSON.stringify(metadata, null, 2)
  );
  const [error, setError] = useState("");

  const handleJsonChange = (value: string) => {
    setJsonString(value);
    try {
      const parsed = JSON.parse(value);
      setValue("metadata", parsed);
      setError("");
    } catch (e) {
      setError("JSON không hợp lệ");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata (Dữ liệu bổ sung)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>
          Metadata (JSON)
          <span className="ml-2 text-xs text-muted-foreground">
            Dữ liệu tùy chỉnh dạng JSON
          </span>
        </Label>
        <Textarea
          value={jsonString}
          onChange={(e) => handleJsonChange(e.target.value)}
          rows={10}
          placeholder='{\n  "key": "value"\n}'
          className="font-mono text-sm"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Ví dụ: {`{ "location": "Hà Nội", "speaker": "Nguyễn Văn A" }`}
        </p>
      </CardContent>
    </Card>
  );
}
