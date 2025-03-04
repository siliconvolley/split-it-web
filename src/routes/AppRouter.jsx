import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from '@/pages/HomePage';
import AddBill from '@/pages/AddBillPage';
import AddFriends from '@/pages/AddFriendsPage';
import Shares from '@/pages/DisplaySharesPage';
import UploadImage from '@/pages/UploadImagePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/bill',
    element: <AddBill/>
  },
  {
    path: '/bill/friends',
    element: <AddFriends/>
  },
  {
    path: '/bill/shares',
    element: <Shares/>
  },
  {
    path: '/ocr',
    element: <UploadImage/>
  }
]);

export default function AppRouter() {
    return(<RouterProvider router={router} />);
}