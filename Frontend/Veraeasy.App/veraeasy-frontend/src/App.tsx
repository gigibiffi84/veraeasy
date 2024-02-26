import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "@/pages/Root.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import ContactVerificationWorkflowPage from "@/pages/ContactVerificationWorkflowPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: 'verifications/:id',
                element: <ContactVerificationWorkflowPage></ContactVerificationWorkflowPage>

            }
        ]
    }
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
