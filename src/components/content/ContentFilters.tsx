import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentStatus, ContentType, Priority } from "@/types/content";
import type { ContentQueryParams } from "@/types/content";

interface ContentFiltersProps {
  filters: ContentQueryParams;
  onChange: (filters: Partial<ContentQueryParams>) => void;
}

export function ContentFilters({ filters, onChange }: ContentFiltersProps) {
  return (
    <div className="mt-4 grid gap-4 border-t pt-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <Label>Trạng thái</Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            onChange({ status: value === "all" ? undefined : (value as ContentStatus) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {Object.values(ContentStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Loại nội dung</Label>
        <Select
          value={filters.type || "all"}
          onValueChange={(value) =>
            onChange({ type: value === "all" ? undefined : (value as ContentType) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {Object.values(ContentType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Từ ngày</Label>
        <Input
          type="date"
          value={filters.dateFrom || ""}
          onChange={(e) => onChange({ dateFrom: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Đến ngày</Label>
        <Input
          type="date"
          value={filters.dateTo || ""}
          onChange={(e) => onChange({ dateTo: e.target.value })}
        />
      </div>
    </div>
  );
}
