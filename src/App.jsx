import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from "react-router-dom";

import HomeLayout from "./layout/home/home";
import AuthLayout from "./layout/auth/auth";

import Home from "./pages/home/home";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Verify from "./pages/verify/verify";
import Dashboard from "./pages/dashboard/dashboard";
import signInAction from "./pages/signin/action";
import signUpAction from "./pages/signup/action";
import ExpandSurvey from "./pages/expandsurvey/expandsurvey";
import PostSurvey from "./pages/postsurvey/postsurvey";
import SurveyForm from "./pages/surveyform/surveyform";
import Payment from "./pages/payment/payment"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="expandsurvey" element={<ExpandSurvey />} />
                <Route path="postsurvey" element={<PostSurvey />} />
                <Route path="surveyform" element={<SurveyForm />} />
                <Route path="payment" element={<Payment />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="signin" element={<SignIn />} action={signInAction} />
                <Route path="signup" element={<SignUp />} action={signUpAction} />
                <Route path="verify" element={<Verify />} />
            </Route>
        </Route>
    )
)

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App;