import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
/* import ProtectedRoute from "./ProtectedRoute"; */
import Profile from "../components/Profile/Profile";
import Recipe from "../components/Recipes/Recipe";
import Recipes from "../components/Recipes/Recipes";
import NotFound from "../components/NotFound";
import CrudRecipeForm from "../components/Forms/CrudRecipeForm";
import RecipesCategory from "../components/Categories/RecipesCategory";
import MyAccount from "../components/Profile/MyAccount";
import MyFavorites from "../components/Profile/MyFavorites";
import MyRecipes from "../components/Profile/MyRecipes";
import { CrudProvider } from "../context/CrudContext";
import LayoutAccount from "./LayoutAccount";
import { AuthProvider } from "../context/AuthContext";


const Router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                index: true, // path: "/"
                element: <Home/>,
            },
            {
                path: "recipes",
                children: [
                    {
                        index: true,
                        element: <Recipes/>,
                    },
                    {
                        path: ":id",
                        element: <Recipe/>,
                    },
                    {
                        path: "category/:id",
                        element: <RecipesCategory/>,
                    },
                    
                ],
            },
            
            {
                element: <LayoutAccount/>,
                children: [  
                {
                    path: "my-account",
                    children:[
                        {
                            path: "me",
                            element:
                           
                                <MyAccount/>
                             
                        },
                        {
                            path: "my-recipes",
                            children:[
                                {
                                    index: true,
                                    element: <MyRecipes/>,
                                },
                                {
                                    path:"new",
                                    element:
                                    <CrudProvider>
                                        <CrudRecipeForm/>
                                    </CrudProvider>,
                                },
                                {
                                    path:"edit/:id",
                                    element:<CrudProvider>
                                                <CrudRecipeForm/>
                                            </CrudProvider>,
                                },
                            ]
                            
                        },
                        {
                            path: "my-favorites",
                            element:<MyFavorites/>
                        },
                    ]
                },
                
                
                ]
            },
        ],
    },
    {
        path: "*",
        element: <NotFound/>,
    },
    {
        path: "login",
        element: <AuthProvider><Login /></AuthProvider>
        ,
    },
]);

export { Router };