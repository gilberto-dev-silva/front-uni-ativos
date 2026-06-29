import type { BreadcrumbItem } from "./Breadcrumb.types";

export const DEFAULT_PAGE_CONFIG: BreadcrumbItem = {
  route: "/",
  label: "Home",
  icon: "pi pi-home",
};

export const BREADCRUMB_CLASSES = {
  container: "",
  icon: "text-color",
  itemInactive: "text-surface-700 dark:text-surface-0",
  separator: "text-surface-400 dark:text-surface-600 mx-2",
  itemActive: "text-primary font-medium hover:text-primary-600",
  itemStatic: "text-surface-500 dark:text-surface-400 font-medium",
  itemLink: "flex items-center gap-2 no-underline transition-colors duration-200",
} as const;
