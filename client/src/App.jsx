import { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const LurnyQuiz = lazy(() => import("./pages/LurnyQuiz"));
const LurnyPrice = lazy(() => import("./pages/LurnyPrice"));
const LurnyPublish = lazy(() => import("./pages/LurnyPublish"));
const LurnyUser = lazy(() => import("./pages/LurnyUser"));
const LurnySetting = lazy(() => import("./pages/LurnySetting"));
const LurnySearch = lazy(() => import("./pages/LurnySearch"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoutes"));

import { getLurnies } from "./actions/lurny";
import { setUserDetails } from "./reducers/userSlice";

import "./App.css";
import "animate.css";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getLurnies());
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      dispatch(setUserDetails(jwtDecode(accessToken)));
    }
  }, []);

  useEffect(() => {
    function handleMessage(event) {
      if (
        event.source === window &&
        event.data.type &&
        event.data.type === "FROM_EXTENSION"
      ) {
        const data = event.data.payload;
        console.log("Received data in React:", data);
        localStorage.setItem("tempData", JSON.stringify(data));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <Suspense>
        <Router style={{ minWidth: "100vw" }}>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/lurny/list" element={<LurnyPublish />} />
              <Route path="/lurny-category" element={<LurnyUser />} />
              <Route path="/lurny/feeds/:id" element={<LurnyQuiz />} />
              <Route path="/lurny/search" element={<LurnySearch />} />
              <Route path="/lurny/price" element={<LurnyPrice />} />
              <Route path="/lurny/setting" element={<LurnySetting />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
