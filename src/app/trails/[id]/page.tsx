"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ProgressBar } from "~/components/ProgressBar";
import { ItemCardView } from "~/components/trails/ItemCardView";
import { ButtonLink } from "~/components/ui/button-link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useTrail, useTrailItems } from "~/hooks";

export default function TrailDetailPage() {
  const params = useParams();
  const trailId = Number.parseInt(params.id as string, 10);

  if (Number.isNaN(trailId)) {
    notFound();
  }

  const { data: trail, isLoading: trailLoading } = useTrail(trailId);
  const { data: trailItems = [], isLoading: itemsLoading } =
    useTrailItems(trailId);

  if (trailLoading || itemsLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Carregando...</div>
        </div>
      </main>
    );
  }

  if (!trail) {
    notFound();
  }

  const completedItems = trailItems.filter(
    (item: { completed: boolean }) => item.completed
  );
  const progress =
    trailItems.length > 0
      ? (completedItems.length / trailItems.length) * 100
      : 0;

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

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="mb-2 text-3xl">{trail.name}</CardTitle>
                {trail.description && (
                  <CardDescription className="text-base">
                    {trail.description}
                  </CardDescription>
                )}
              </div>
              <CardAction>
                <ButtonLink href={`/trails/${trail.id}/edit`} variant="outline">
                  Editar Trilha
                </ButtonLink>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedItems.length} / {trailItems.length} itens concluídos
              </span>
              <span className="font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar progress={progress} />
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Itens</h2>
        </div>

        {trailItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-lg text-muted-foreground">
                Ainda não há itens. Adicione seu primeiro item para começar!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {trailItems.map(
              (item: {
                id: number;
                name: string;
                description: string | null;
                xp: number;
                completed: boolean;
              }) => (
                <ItemCardView
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  xp={item.xp}
                  completed={item.completed}
                />
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}

