import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Bell } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Tổng nội dung",
      value: "248",
      change: "+12%",
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Người dùng",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Lượt xem",
      value: "12.5K",
      change: "+23%",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Thông báo",
      value: "56",
      change: "+5%",
      icon: Bell,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tổng quan</h1>
        <p className="text-muted-foreground">
          Chào mừng bạn đến với hệ thống quản trị Loa Phường
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Chưa có hoạt động nào
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nội dung phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Chưa có dữ liệu
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
