// Export all hooks from a single entry point

// Queries
export * from "./queries/stats/useStats";
export * from "./queries/trails/useListTrails";
export * from "./queries/trails/useTrail";
export * from "./queries/trails/useTrailItems";

// Mutations
export * from "./mutations/items/useCompleteItem";
export * from "./mutations/items/useCreateItem";
export * from "./mutations/items/useDeleteItem";
export * from "./mutations/items/useReorderItems";
export * from "./mutations/items/useUpdateItem";
export * from "./mutations/trails/useCreateTrail";
export * from "./mutations/trails/useDeleteTrail";
export * from "./mutations/trails/useUpdateTrail";

// Export types from schemas for use in components
export type {
    CreateItemInput,
    CreateTrailInput,
    UpdateItemInput,
    UpdateTrailInput
} from "~/server/api/schemas";

