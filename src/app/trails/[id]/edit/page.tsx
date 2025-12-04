import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrailForm } from "~/components/forms/TrailForm";
import { Card, CardContent } from "~/components/ui/card";
import { db } from "~/server/db";
import { trails } from "~/server/db/schema";

async function getTrail(id: number) {
  const [trail] = await db
    .select()
    .from(trails)
    .where(eq(trails.id, id))
    .limit(1);

  return trail;
}

export default async function EditTrailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trailId = Number.parseInt(id, 10);

  if (Number.isNaN(trailId)) {
    notFound();
  }

  const trail = await getTrail(trailId);
  if (!trail) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/trails/${trail.id}`}
            className="text-primary hover:text-primary/80 hover:underline"
          >
            ← Voltar para Trilha
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">
            Editar Trilha
          </h1>
          <Card>
            <CardContent className="p-6">
              <TrailForm
                mode="edit"
                initialData={{
                  id: trail.id,
                  name: trail.name,
                  description: trail.description,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

