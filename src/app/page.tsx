import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { HomeIcon } from "@heroicons/react/24/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Next.js Starter</h1>
        <HomeIcon className="h-6 w-6" />
        <HomeIconOutline className="h-6 w-6" />
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your new project!</CardTitle>
            <CardDescription>
              This is a starter template with Next.js, TypeScript, and shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Type something..." />
            <Button>Click me</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
