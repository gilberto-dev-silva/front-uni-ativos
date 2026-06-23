export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  badgeTextColor: string;
}

export interface RecentAsset {
  id: string;
  name: string;
  department: string;
  time: string;
  status: "active" | "stock" | "maintenance";
  icon: string;
}

export interface Alert {
  id: string;
  message: string;
  location: string;
  time: string;
  severity: "critical" | "warning";
}

export interface InventoryItem {
  category: string;
  percentage: number;
  color: string;
}
