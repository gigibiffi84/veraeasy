import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "@/pages/Root.tsx";
import HomePage from "@/pages/Home/HomePage.tsx";
import ContactVerificationWorkflowPage from "@/pages/ContactVerificationWorkflowPage.tsx";
import SignInPage from "@/pages/SignIn/SignInPage.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {AuthRoute} from "@/components/auth/AuthRoute.tsx";
import {RootStore} from "@/features/Store.ts";
import {Provider} from "react-redux";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root className={"p-0"}></Root>,
        children: [
            {
                index: true,
                element: <AuthRoute><HomePage></HomePage></AuthRoute>
            },
            {
                path: '/home',
                element: <AuthRoute><HomePage></HomePage></AuthRoute>
            },
            {
                path: '/login',
                element: <SignInPage/>
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
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Provider store={RootStore}>
                    <RouterProvider router={router}/>
                </Provider>
            </ThemeProvider>
        </>
    )
}

export default App
