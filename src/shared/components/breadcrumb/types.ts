export interface BreadcrumbItem {
  url?: string;
  label: string;
  icon?: string;
  class?: string;
  target?: string;
  disabled?: boolean;
  route?: string | object;
}

export interface BreadcrumbProps {
  home?: BreadcrumbItem;
  model: BreadcrumbItem[];
}
