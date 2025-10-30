import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Không tìm thấy trang</h2>
          <p className="text-muted-foreground">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin">
              <Home className="mr-2 h-4 w-4" />
              Trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
