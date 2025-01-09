"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
// import { useRouter } from "@/lib/navigation";
// import { useEffect } from "react";
import { env } from "@/lib/env";

export default function LandingPage() {
  const t = useTranslations("landing");
  const { data: session, status } = useSession();
  // const router = useRouter();

  // Redirect to dashboard if already authenticated
  // useEffect(() => {
  //   if (session) {
  //     router.push("/dashboard");
  //   }
  // }, [session, router]);

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      signIn(env.PLATFORM, { callbackUrl: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-primary/5">
      <div className="max-w-4xl px-4 py-4 mx-auto">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">Logo</div>
          <div className="space-x-4">
            {status === "loading" ? (
              <Button variant="ghost" disabled>
                Loading...
              </Button>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {session.user?.email}
                </span>
                <Button variant="ghost" onClick={handleAuth}>
                  {t("logout")}
                </Button>
                <Link href="/dashboard">
                  <Button>{t("dashboard")}</Button>
                </Link>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={handleAuth}>
                  {t("login")}
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="space-x-4">
              <Button size="lg">{t("hero.cta")}</Button>
              <Button variant="outline" size="lg">
                {t("hero.secondary")}
              </Button>
            </div>
          </div>

          <Card className="p-2 bg-background/60 backdrop-blur">
            <CardContent className="grid gap-4">
              <div className="h-64 bg-muted rounded-lg" />
              <p className="text-sm text-center text-muted-foreground">
                {t("hero.imageCaption")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
