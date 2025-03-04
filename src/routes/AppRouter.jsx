import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import AddBillPage from '@/pages/AddBillPage';
import AddFriendsPage from '@/pages/AddFriendsPage';
import DisplaySharesPage from '@/pages/DisplaySharesPage';
import UploadImagePage from '@/pages/UploadImagePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/bill',
    element: <AddBillPage />,
  },
  {
    path: '/bill/friends',
    element: <AddFriendsPage />,
  },
  {
    path: '/bill/shares',
    element: <DisplaySharesPage />,
  },
  {
    path: '/ocr',
    element: <UploadImagePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
