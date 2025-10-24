import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

// users
import User from "./Users/reducer"
// permissions
import Permission from "./Permissions/reducer"

// roles
import Role from "./Roles/reducer"

//Publications
import Publication from "./Publications/reducer"

// Customers
import Customer from "./Customers/reducer";

// Levels
import Level from "./Levels/reducer"

// rewards
import Reward from "./Rewards/reducer"

// categories
import Category from "./Categories/reducer"

// moods
import Mood from "./Moods/reducer"

//Category plans
import Plan from "./Plans/reducer"

// affirmations
import Affirmation from "./Affirmations/reducer"

// reedemplans
import ReedemPlan from "./ReedemPlans/reducer"

// subscriptions
import Subscription from "./Subscriptions/reducer"

// redeem subscriptions
import RedeemSubscription from "./RedeemSubscriptions/reducer"

// ritual calendar 
import Ritual from "./RitualCalendar/reducer"

// payment logs
import PaymentLog from "./PaymentLogs/reducer"
import PaymentLogDataTable from "components/TableContainers/PaymentLogDataTable"
import UserToken from "./UserTokens/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  User,
  Customer,
  Permission,
  Role,
  Publication,
  Category,
  Level,
  Reward,
  Mood,
  Plan,
  Affirmation,
  ReedemPlan,
  Subscription,
  RedeemSubscription,
  Ritual,
  PaymentLog,
  UserToken
})

export default rootReducer
