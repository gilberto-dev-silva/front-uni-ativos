import type { MenuItem } from "primevue/menuitem";
import type { RouteLocationRaw } from "vue-router";

export interface BreadcrumbItem extends Omit<MenuItem, "to" | "url"> {
  url?: string;
  icon?: string;
  label: string;
  class?: string;
  disabled?: boolean;
  route?: RouteLocationRaw;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

export interface BreadcrumbProps {
  class?: string;
  model: BreadcrumbItem[];
  pageConfig?: BreadcrumbItem;
}

export interface BreadcrumbSlots {
  separator(): unknown;
  item(props: { item: BreadcrumbItem; props: Record<string, unknown> }): unknown;
}
