import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import AuthLayout from "@/layout/auth/AuthLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Auth pages
import LogIn from "@/pages/LogIn.vue";
import SignUp from "@/pages/SignUp.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import SubmissionHistory from "@/pages/SubmissionHistory.vue";
import SubmissionDetail from "@/pages/SubmissionDetail.vue";
import InfoPage from "@/pages/InfoPage.vue";
import LogOut from "@/pages/LogOut.vue";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Log In",
        component: LogIn
      },
      {
        path: "signup",
        name: "Sign Up",
        component: SignUp
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      // {
      //   path: "profile",
      //   name: "User Profile",
      //   component: UserProfile
      // },
      {
        path: "history",
        name: "Submission History",
        component: SubmissionHistory
      },
      {
        path: "submission/:id",
        name: "Submission Detail",
        component: SubmissionDetail
      },
      {
        path: "info",
        name: "Info Page",
        component: InfoPage
      },
      {
        path: "logout",
        name: "Log Out",
        component: LogOut
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
