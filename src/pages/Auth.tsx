import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { LogIn, UserPlus, Radio } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login: setAuth } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      setAuth(response.token, response.user);
      toast({
        title: 'Đăng nhập thành công',
        description: `Chào mừng ${response.user.name}!`,
      });
      navigate('/admin');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: error.response?.data?.message || 'Email hoặc mật khẩu không đúng',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'CONTENT_CREATOR',
      });
      setAuth(response.token, response.user);
      toast({
        title: 'Đăng ký thành công',
        description: 'Tài khoản của bạn đã được tạo!',
      });
      navigate('/admin');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Đăng ký thất bại',
        description: error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-hero p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0yNCA0NGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <Card className="w-full max-w-md relative shadow-xl backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
              <Radio className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Loa Phường Service
          </CardTitle>
          <CardDescription className="text-base">
            Hệ thống quản lý nội dung thông báo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Đăng nhập
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Đăng ký
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-0">
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    {...loginForm.register('email')}
                    className={loginForm.formState.errors.email ? 'border-destructive' : ''}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Mật khẩu</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register('password')}
                    className={loginForm.formState.errors.password ? 'border-destructive' : ''}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="gradient"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-0">
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Họ và tên</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    {...signupForm.register('name')}
                    className={signupForm.formState.errors.name ? 'border-destructive' : ''}
                  />
                  {signupForm.formState.errors.name && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    {...signupForm.register('email')}
                    className={signupForm.formState.errors.email ? 'border-destructive' : ''}
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Mật khẩu</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    {...signupForm.register('password')}
                    className={signupForm.formState.errors.password ? 'border-destructive' : ''}
                  />
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Xác nhận mật khẩu</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    {...signupForm.register('confirmPassword')}
                    className={signupForm.formState.errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="gradient"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground border-t pt-4">
          <p>© 2024 Loa Phường Service. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
