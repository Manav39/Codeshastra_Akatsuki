import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import ExploreDetails from 'src/sections/explore/ExploreDetails';
import StockDetails from 'src/sections/stocks/StockDetails';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/trades'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'portfolio', element: <IndexPage /> },
        { path: 'trades', element: <UserPage /> },
        { path: 'watchlist', element: <UserPage /> },
        { path: 'explore', element: <ProductsPage /> },
        { path: 'news', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
      index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: "trades/:id",
      element: <StockDetails />
    },
    {
      path: "explore/:id",
      element: <ExploreDetails />
    }
  ]);

  return routes;
}
