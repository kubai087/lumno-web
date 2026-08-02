import { useEffect, useState } from "react";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import AccountPortal from "./AccountPortal";

export default function OAuthAuthorizePortal() {
  const [authorizationId, setAuthorizationId] = useState<string | null>(null);

  useEffect(() => {
    setAuthorizationId(new URLSearchParams(window.location.search).get("authorization_id") || "");
  }, []);

  if (authorizationId === null) {
    return (
      <Card className="auth-card" aria-live="polite">
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
          <Spinner data-icon="inline-start" aria-label="正在确认登录请求…" />
          <p>正在确认登录请求…</p>
        </CardContent>
      </Card>
    );
  }

  if (!authorizationId) {
    return (
      <Card className="auth-card" role="alert">
        <CardHeader className="auth-card-header flex flex-col items-center text-center">
          <span className="auth-error-mark" aria-hidden="true">
            <CircleAlertIcon />
          </span>
          <CardTitle>
            <h1>登录请求无效</h1>
          </CardTitle>
          <CardDescription>请返回 Lumno 插件并重新发起登录。</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild size="auth">
            <a href="/account/">
              <ArrowRightIcon data-icon="inline-start" />
              前往账号中心
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <AccountPortal authorizationId={authorizationId} />;
}
