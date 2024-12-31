import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Next.js Starter</h1>

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
