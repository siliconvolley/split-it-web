import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from '@pages/home/HomePage';
import AddBill from '@pages/bill/AddBill';
import AddFriends from '@pages/friends/AddFriends';
import Shares from '@pages/shares/Shares';
import UploadImage from '@pages/ocr/UploadImage';


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