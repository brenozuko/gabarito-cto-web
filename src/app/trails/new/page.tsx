import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { TrailForm } from "~/components/forms/TrailForm";

export default function NewTrailPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-primary hover:text-primary/80 hover:underline"
          >
            ← Voltar para Trilhas
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">
            Criar Nova Trilha
          </h1>
          <Card>
            <CardContent className="p-6">
              <TrailForm mode="create" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

