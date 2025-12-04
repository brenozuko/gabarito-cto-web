import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import { trails } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TrailForm } from "~/components/forms/TrailForm";

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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/trails/${trail.id}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Back to Trail
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Edit Trail
          </h1>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <TrailForm
              mode="edit"
              initialData={{
                id: trail.id,
                name: trail.name,
                description: trail.description,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

