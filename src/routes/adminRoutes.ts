import AllParcels from "../pages/Admin/AllParcels";
import AllUsers from "../pages/Admin/AllUsers";
import Analytics from "../pages/Admin/Analytics";
import AssignDelivery from "../pages/Admin/AssignDelivery";
import type { ISidebarItem } from "../types";

export const adminRoutes: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Analytics", url: "/admin/analytics", component: Analytics },
      { title: "All Users", url: "/admin/all-users", component: AllUsers },
      {
        title: "All Parcels",
        url: "/admin/all-parcels",
        component: AllParcels,
      },
      {
        title: "Assign Delivery",
        url: "/admin/assign-delivery",
        component: AssignDelivery,
      },
    ],
  },
];
