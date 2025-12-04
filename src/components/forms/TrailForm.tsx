"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useCreateTrail, useUpdateTrail } from "~/hooks";

const trailFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(256, "Nome deve ter no máximo 256 caracteres"),
  description: z.string().max(1000, "Descrição deve ter no máximo 1000 caracteres").optional().or(z.literal("")),
});

type TrailFormData = z.infer<typeof trailFormSchema>;

interface TrailFormProps {
  initialData?: {
    id: number;
    name: string;
    description: string | null;
  };
  mode: "create" | "edit";
}

export function TrailForm({ initialData, mode }: TrailFormProps) {
  const router = useRouter();
  const createTrail = useCreateTrail();
  const updateTrail = useUpdateTrail();

  const form = useForm<TrailFormData>({
    resolver: zodResolver(trailFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
    },
  });

  const onSubmit = async (data: TrailFormData) => {
    try {
      if (mode === "create") {
        await createTrail.mutateAsync({
          name: data.name,
          description: data.description || undefined,
        });
      } else if (initialData) {
        await updateTrail.mutateAsync({
          id: initialData.id,
          data: {
            name: data.name,
            description: data.description || undefined,
          },
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving trail:", error);
      alert("Falha ao salvar trilha. Por favor, tente novamente.");
    }
  };

  const isFormSubmitting = form.formState.isSubmitting || createTrail.isPending || updateTrail.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <Input {...field} maxLength={256} disabled={isFormSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} disabled={isFormSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isFormSubmitting}>
            {isFormSubmitting ? "Salvando..." : mode === "create" ? "Criar" : "Salvar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isFormSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}

