import { lazy } from "react";

const PagesRoutes = [
    {
        path: "/login",
        component: lazy(() => import("../../view/auth/login")),
        layout: "FullLayout",
        auth: false,
    },
    {
        path: "/dashboard",
        component: lazy(() => import("../../view/admin/dashboard")),
        layout: "VerticalLayout",
        auth: false,
    }
];

export default PagesRoutes;