import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import LurnyQuiz from "./pages/LurnyQuiz";
import LurnyPrice from "./pages/LurnyPrice";
import LurnyPublish from "./pages/LurnyPublish";
import LurnyUser from "./pages/LurnyUser";
import LurnySetting from "./pages/LurnySetting";
import LurnySearch from "./pages/LurnySearch";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./routes/ProtectedRoutes";

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
