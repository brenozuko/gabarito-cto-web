import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "~/server/db";
import { trails, items } from "~/server/db/schema";
import { eq, asc } from "drizzle-orm";
import { ItemCard } from "~/components/trails/ItemCard";
import { ProgressBar } from "~/components/ui/ProgressBar";

async function getTrail(id: number) {
  const [trail] = await db
    .select()
    .from(trails)
    .where(eq(trails.id, id))
    .limit(1);

  return trail;
}

async function getTrailItems(id: number) {
  const trailItems = await db
    .select()
    .from(items)
    .where(eq(items.trailId, id))
    .orderBy(asc(items.order), asc(items.id));

  return trailItems;
}

export default async function TrailDetailPage({
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

  const trailItems = await getTrailItems(trailId);
  const completedItems = trailItems.filter((item) => item.completed);
  const progress =
    trailItems.length > 0
      ? (completedItems.length / trailItems.length) * 100
      : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Back to Trails
          </Link>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {trail.name}
              </h1>
              {trail.description && (
                <p className="text-gray-600">{trail.description}</p>
              )}
            </div>
            <Link
              href={`/trails/${trail.id}/edit`}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Edit
            </Link>
          </div>

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {completedItems.length} / {trailItems.length} items completed
            </span>
            <span className="font-semibold text-gray-900">
              {Math.round(progress)}%
            </span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Items</h2>
          <Link
            href={`/trails/${trail.id}/items/new`}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Item
          </Link>
        </div>

        {trailItems.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-lg text-gray-600">
              No items yet. Add your first item to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {trailItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                xp={item.xp}
                completed={item.completed}
                trailId={trail.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

