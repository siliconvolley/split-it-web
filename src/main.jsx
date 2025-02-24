import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import HomePage from '@pages/homepage/HomePage';
import AddBill from '@pages/bill/AddBill';
import AddFriends from '@pages/addfriends/AddFriends';
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
