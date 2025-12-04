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
import { useCreateItem, useUpdateItem } from "~/hooks";

const itemFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(256, "Nome deve ter no máximo 256 caracteres"),
  description: z.string().max(1000, "Descrição deve ter no máximo 1000 caracteres").optional().or(z.literal("")),
  xp: z.coerce.number().int().positive("XP deve ser um número positivo").min(1, "XP deve ser pelo menos 1"),
  order: z.coerce.number().int().nonnegative("Ordem deve ser um número não negativo"),
});

type ItemFormData = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
  trailId: number;
  initialData?: {
    id: number;
    name: string;
    description: string | null;
    xp: number;
    order: number;
  };
  mode: "create" | "edit";
  onSuccess?: () => void;
}

export function ItemForm({
  trailId,
  initialData,
  mode,
  onSuccess,
}: ItemFormProps) {
  const router = useRouter();
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      xp: initialData?.xp ?? 10,
      order: initialData?.order ?? 0,
    },
  });

  const onSubmit = async (data: ItemFormData) => {
    try {
      if (mode === "create") {
        await createItem.mutateAsync({
          trailId,
          name: data.name,
          description: data.description || undefined,
          xp: data.xp,
          order: data.order,
        });
      } else if (initialData) {
        await updateItem.mutateAsync({
          id: initialData.id,
          data: {
            name: data.name,
            description: data.description || undefined,
            xp: data.xp,
            order: data.order,
          },
        });
      }
      onSuccess?.();
      if (!onSuccess) {
        router.back();
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Falha ao salvar item. Por favor, tente novamente.");
    }
  };

  const isFormSubmitting = form.formState.isSubmitting || createItem.isPending || updateItem.isPending;

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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="xp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>XP *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                    value={field.value}
                    min={1}
                    disabled={isFormSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ordem</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                    value={field.value}
                    min={0}
                    disabled={isFormSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isFormSubmitting}>
            {isFormSubmitting ? "Salvando..." : mode === "create" ? "Criar" : "Salvar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (onSuccess) {
                onSuccess();
              } else {
                router.back();
              }
            }}
            disabled={isFormSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
