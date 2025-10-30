import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/admin/Dashboard";
import ContentList from "./pages/admin/content/ContentList";
import ContentForm from "./pages/admin/content/ContentForm";
import ContentDetail from "./pages/admin/content/ContentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ContentList />} />
            <Route path="content/new" element={<ContentForm />} />
            <Route path="content/:id" element={<ContentDetail />} />
            <Route path="content/:id/edit" element={<ContentForm />} />
            <Route path="categories" element={<div className="p-6">Danh mục (Đang phát triển)</div>} />
            <Route path="tags" element={<div className="p-6">Thẻ tag (Đang phát triển)</div>} />
            <Route path="analytics" element={<div className="p-6">Thống kê (Đang phát triển)</div>} />
            <Route path="settings" element={<div className="p-6">Cài đặt (Đang phát triển)</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
