import { createBrowserRouter } from "react-router";
import Home from "./component/Home"
import AppLayout from "./component/AppLayout";
import Recipe from "./component/Recipe";
import About from "./component/About";
import RecipesList from "./component/RecipeList";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: 'about', element: <About /> },
            {
                path: 'recipes', element: <RecipesList />,
                children: [
                    { path: ':name', element: <Recipe/>}
                ]
            }]
    }
])