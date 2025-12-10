import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useLocation } from "wouter";
import { PawPrint } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { loginMutation } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password }, {
      onSuccess: () => {
        setLocation("/admin/dashboard");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-3 rounded-xl">
              <PawPrint size={32} />
            </div>
          </div>
          <CardTitle className="font-heading text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            {loginMutation.error && <p className="text-red-500 text-sm font-bold">{loginMutation.error.message}</p>}
            <Button type="submit" className="w-full h-11 font-bold mt-2" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Use admin / vahis123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
