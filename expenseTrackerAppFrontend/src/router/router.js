import {createBrowserRouter} from "react-router";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../components/Login";
import GuestLayout from "../Layouts/GuestLayout";
import Group from "../components/Group";
import Expense from "../components/Expense";
import ManageGroup from "../components/ManageGroup";
import ManageExpense from "../components/ManageExpense";
import EditExpense from "../components/EditExpense";
import Layout from "../Layouts/Layout";
  let router = createBrowserRouter([
    {
      path: "/",
      Component: AuthLayout,
      children:[
        {
           Component:Layout,
           children:[
            {
               path:"/dashboard",
               Component:Dashboard
            },
            {
              path:'/manage-expense',
              Component:ManageExpense
            },
            {
              path:'/create-expense',
              Component:Expense
            }
           ]
        },
        {
            path:'/manage-group',
            Component:ManageGroup
        },
       
        {
            path:'/edit-expense/:id',
            Component:EditExpense
        },
        {
          path:'/create-group',
          Component:Group
        },
      
      ]
    },
    {
      path: "/",
      Component: GuestLayout,
      children:[
        {
          path: "/register",
          Component: SignUp,
        },
        {                                         
          path: "/login",
          Component: Login,
        }
      ]
    },
   
  ]);
export default router;