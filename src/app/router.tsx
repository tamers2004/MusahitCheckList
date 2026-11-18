import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { NewInstallation } from '@/pages/NewInstallation';
import { InstallationWorkspace } from '@/pages/InstallationWorkspace';
import { InstallationHistory } from '@/pages/InstallationHistory';
import { Settings } from '@/pages/Settings';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'new-installation', element: <NewInstallation /> },
        { path: 'installation/:id', element: <InstallationWorkspace /> },
        { path: 'history', element: <InstallationHistory /> },
        { path: 'settings', element: <Settings /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
  },
);

export const AppRouter = () => <RouterProvider router={router} />;
