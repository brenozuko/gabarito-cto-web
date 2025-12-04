import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import { trails } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { ItemForm } from "~/components/forms/ItemForm";

async function getTrail(id: number) {
  const [trail] = await db
    .select()
    .from(trails)
    .where(eq(trails.id, id))
    .limit(1);

  return trail;
}

export default async function NewItemPage({
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
            Add New Item to "{trail.name}"
          </h1>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <ItemForm
              mode="create"
              trailId={trail.id}
              onSuccess={() => {
                // This will be handled client-side via router.push
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

