import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import NotFound from "@/pages/not-found";

export function ProtectedRoute({ component: Component, path }: { component: React.ComponentType<any>, path: string }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Route path={path}>
                <div className="flex items-center justify-center min-h-screen bg-slate-100">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Route>
        );
    }

    if (!user) {
        return (
            <Route path={path}>
                <NotFound />
            </Route>
        );
    }

    return <Route path={path} component={Component} />;
}
