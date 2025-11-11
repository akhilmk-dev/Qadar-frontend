import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import UserSaga from "./Users/saga"
import PermissionSaga from "./Permissions/saga"
import Roles from "./Roles/saga"
import PublicationSaga from "./Publications/saga"
import CustomerSaga from "./Customers/saga"
import LevelSaga from "./Levels/saga";
import RewardSaga from "./Rewards/saga"
import CategorieSaga from "./Categories/saga"
import MoodSaga from "./Moods/saga"
import PlanSaga from "./Plans/saga"
import AffirmationSaga from "./Affirmations/saga";
import ReedemPlanSaga from "./ReedemPlans/saga"
import SubscriptionSaga from "./Subscriptions/saga"
import RedeemSubscriptionSaga from "./RedeemSubscriptions/saga"
import RitualCalendarSaga from "./RitualCalendar/saga"
import PaymentLogSaga from "./PaymentLogs/saga"
import userTokenSaga from "./UserTokens/saga"
import userPointsSaga from "./UserPoints/saga"
import cmsSaga from "./Cms/saga";

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    UserSaga(),
    PermissionSaga(),
    Roles(),
    PublicationSaga(),
    CustomerSaga(),
    LevelSaga(),
    RewardSaga(),
    CategorieSaga(),
    MoodSaga(),
    PlanSaga(),
    AffirmationSaga(),
    ReedemPlanSaga(),
    SubscriptionSaga(),
    RedeemSubscriptionSaga(),
    RitualCalendarSaga(),
    PaymentLogSaga(),
    userTokenSaga(),
    userPointsSaga(),
    cmsSaga()
  ])
}
