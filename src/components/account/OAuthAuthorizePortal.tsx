import { useMemo } from "react";
import { ArrowRightIcon, CircleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountPortal from "./AccountPortal";

export default function OAuthAuthorizePortal() {
  const authorizationId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("authorization_id") || "";
  }, []);

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
