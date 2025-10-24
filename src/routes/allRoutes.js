import React from "react";


//Email

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import ResetPassword from '../pages/Authentication/ResetPassword';

//  // Inner Authentication

// Dashboard
import Dashboard from "../pages/Dashboard/index";
// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";


//Ui

//Pages
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import UserList from "pages/Users/UserList";
import UserProfile from "pages/UserProfile/UserProfile";
import ChangePassword from "pages/UserProfile/ChangePassword";
import { Navigate } from "react-router-dom";

import Otp from "pages/Authentication/Otp";
import Pages403 from "pages/Utility/pages-403";
import RoleList from "pages/Roles/RoleList";
import CreateRole from "pages/Roles/CreateRole";
import CustomerList from "pages/Customers/CustomerList";
import CustomerDetails from "pages/Customers/CustomerDetails";
import LevelList from "pages/levels/LevelList";
import RewardList from "pages/Rewards/RewardList";
import CategoryList from "pages/Categories/CategorieList";
import MoodList from "pages/Moods/MoodList";
import PlanList from "pages/plans/PlanList";
import AffirmationList from "pages/Affirmations/AffirmationList";
import ReedemPlanList from "pages/ReedemPlans/ReedemPlanList";
import SubscriptionList from "pages/Subscriptions/SubscriptionList";
import RedeemSubscriptionList from "pages/RedeemSubscriptions/RedeemSubscriptionList";
import RitualList from "pages/RitualCalender/RitualList";
import PaymentLogList from "pages/PaymentLogs/PaymentLogList";
import UserTokenList from "pages/UserTokens/UserTokenList";
import UserXPPointsList from "pages/UserPoints/UserPointList";


const userRoutes = [
  // { path: "/", component: <Navigate to="/dashboard" /> },
  { path: "/dashboard", component: <Dashboard /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/change-password", component: <ChangePassword /> },

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },

  // this route should be at the end of all other routes
   {path:"/users", component :<UserList />},
   {path:"/plans", component:<PlanList />},
   {path:"/roles", component :<RoleList />},
   {path:"/createRole",component:<CreateRole />},
   {path:"/profile",component:<UserProfile />},
   {path:'/customers',component:<CustomerList />},
   {path:"/categories",component:<CategoryList />},
   {path:'/affirmations',component:<AffirmationList />},
   {path:"/redeemPlans",component:<ReedemPlanList />},
   {path:"/subscriptions", component:<SubscriptionList />},
   {path:"/redeemSubscriptions",component:<RedeemSubscriptionList />},
   {path:"/moods", component:<MoodList />},
   {path:'/levels',component: <LevelList />},
   {path:'/rewards',component:<RewardList />},
   {path:"/rituals",component:<RitualList />},
   {path:"/user-tokens",component:<UserTokenList />},
   {path:"/paymentlogs",component:<PaymentLogList />},
   {path:'/customerDetails/:id', component:<CustomerDetails />},
   {path:'/userPointList', component:<UserXPPointsList/>}
];

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  {path:"/otp/:id", component:<Otp />},
  { path: "/forgot-password", component: <ForgetPwd /> }, 
  { path: "/reset-password", component: <ResetPassword /> },
  // { path: "/register", component: <Register /> },
  // { path: "/pages-maintenance", component: <PagesMaintenance /> },
  // { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  {path:"/pages-403", component:<Pages403 />},
  { path: "/pages-500", component: <Pages500 /> },

  //Authentication Inner

];

export { userRoutes, authRoutes };
