import Link from "next/link";
import { TrailForm } from "~/components/forms/TrailForm";

export default function NewTrailPage() {
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

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Create New Trail
          </h1>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <TrailForm mode="create" />
          </div>
        </div>
      </div>
    </main>
  );
}

