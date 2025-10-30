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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationType } from "@/types/content";
import type { CreateContentDto } from "@/types/content";

interface ContentNotificationProps {
  form: UseFormReturn<CreateContentDto>;
}

export function ContentNotification({ form }: ContentNotificationProps) {
  const { watch, setValue } = form;
  const notificationOptions = watch("notificationOptions") || {
    enabled: false,
  };

  const handleEnabledChange = (enabled: boolean) => {
    if (enabled) {
      setValue("notificationOptions", {
        enabled: true,
        type: NotificationType.CONTENT_PUBLISHED,
        audience: { all: true },
        channels: ["in_app"],
      });
    } else {
      setValue("notificationOptions", { enabled: false });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tùy chọn Thông báo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notification-enabled">Gửi thông báo khi tạo</Label>
          <Switch
            id="notification-enabled"
            checked={notificationOptions.enabled}
            onCheckedChange={handleEnabledChange}
          />
        </div>

        {notificationOptions.enabled && (
          <>
            <div className="space-y-2">
              <Label>
                Loại thông báo <span className="text-destructive">*</span>
              </Label>
              <Select
                value={notificationOptions.type}
                onValueChange={(value) =>
                  setValue("notificationOptions", {
                    ...notificationOptions,
                    type: value as NotificationType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(NotificationType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Đối tượng nhận</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audience-all"
                    checked={notificationOptions.audience?.all}
                    onCheckedChange={(checked) =>
                      setValue("notificationOptions", {
                        ...notificationOptions,
                        audience: { all: !!checked },
                      })
                    }
                  />
                  <Label htmlFor="audience-all" className="font-normal">
                    Tất cả người dùng
                  </Label>
                </div>

                {!notificationOptions.audience?.all && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="group-ids">ID nhóm (phân cách bằng dấu phẩy)</Label>
                      <Input
                        id="group-ids"
                        placeholder="group1,group2,group3"
                        value={notificationOptions.audience?.groupIds?.join(",") || ""}
                        onChange={(e) =>
                          setValue("notificationOptions", {
                            ...notificationOptions,
                            audience: {
                              ...notificationOptions.audience,
                              groupIds: e.target.value.split(",").map((s) => s.trim()),
                            },
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-ids">ID người dùng (phân cách bằng dấu phẩy)</Label>
                      <Input
                        id="user-ids"
                        placeholder="user1,user2,user3"
                        value={notificationOptions.audience?.userIds?.join(",") || ""}
                        onChange={(e) =>
                          setValue("notificationOptions", {
                            ...notificationOptions,
                            audience: {
                              ...notificationOptions.audience,
                              userIds: e.target.value.split(",").map((s) => s.trim()),
                            },
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kênh gửi</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="channel-email"
                    checked={notificationOptions.channels?.includes("email")}
                    onCheckedChange={(checked) => {
                      const channels = notificationOptions.channels || [];
                      setValue("notificationOptions", {
                        ...notificationOptions,
                        channels: checked
                          ? [...channels, "email"]
                          : channels.filter((c) => c !== "email"),
                      });
                    }}
                  />
                  <Label htmlFor="channel-email" className="font-normal">
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="channel-in-app"
                    checked={notificationOptions.channels?.includes("in_app")}
                    onCheckedChange={(checked) => {
                      const channels = notificationOptions.channels || [];
                      setValue("notificationOptions", {
                        ...notificationOptions,
                        channels: checked
                          ? [...channels, "in_app"]
                          : channels.filter((c) => c !== "in_app"),
                      });
                    }}
                  />
                  <Label htmlFor="channel-in-app" className="font-normal">
                    Trong ứng dụng
                  </Label>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
