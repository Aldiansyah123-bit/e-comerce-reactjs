import { Suspense } from "react";

// Redux

// Router
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

// Routes
import { Routes } from "./routes";

// Layouts
import VerticalLayout from "../layout/VerticalLayout";
import FullLayout from "../layout/FullLayout";

// Components
import Dashboard from "../view/admin/dashboard";
import Error400 from "../view/error/400";
import Error401 from "../view/error/401";
import Error403 from "../view/error/403";
import Error404 from "../view/error/404";
import Error500 from "../view/error/500";

export default function Router() {

    // All of the available layouts
    const Layouts = { VerticalLayout, FullLayout };

    // Return Filtered Array of Routes & Paths
    const LayoutRoutesAndPaths = (layout) => {
        const LayoutRoutes = [];
        const LayoutPaths = [];
        if (Routes) {
            // Checks if Route layout or Default layout matches current layout
            Routes.filter(
                (route) =>
                    route.layout === layout &&
                    (LayoutRoutes.push(route), LayoutPaths.push(route.path))
            );
        }

        return { LayoutRoutes, LayoutPaths };
    };

    function Auth({ children }) {
        const history = useHistory();
        history.push("/login");

        return children;
    }

    // Return Route to Render
    const ResolveRoutes = () => {
        return Object.keys(Layouts).map((layout, index) => {
            const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

            let LayoutTag = Layouts[layout];

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag>
                        <Switch>
                            {LayoutRoutes.map((route) => {
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        render={(props) => {
                                            return (
                                                <Suspense fallback={null}>
                                                    {route.auth === true ? (
                                                        <Auth>
                                                            <route.component {...props} />
                                                        </Auth>
                                                    ) : (
                                                        <route.component {...props} />
                                                    )}
                                                </Suspense>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </Switch>
                    </LayoutTag>
                </Route>
            );
        });
    };

    return (
        <BrowserRouter>
            <Switch>
                {ResolveRoutes()}

                {/* Home Page */}

                <Route
                    exact
                    path={"/"}
                    render={() => {
                        return (
                            <Auth>
                                <Layouts.VerticalLayout>
                                    <Dashboard />
                                </Layouts.VerticalLayout>
                            </Auth>
                        );
                    }}
                />
                {/* NotFound */}
                <Route path="/401">
                    <Error401 />
                </Route>
                <Route path="*">
                    <Error404 />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

