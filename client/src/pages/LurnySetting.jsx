import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import { IoIosArrowForward } from "react-icons/io";

import UserPan from "../components/UserPan";
import Header from "../components/Header";
// import { clearLoading, setLoading } from "../reducers/loadingSlice";

const LurnySetting = () => {
  // const dispatch = useDispatch();

  const { lurnies } = useSelector((state) => state.lurny);

  const [userDetails, setUserDetails] = useState(null);
  const [myLurnies, setMyLurnies] = useState([]);
  const [showSidePan, setShowSidePan] = useState(false);
  // const [showAll, setShowAll] = useState(true);
  // const [filterdLurnies, setFilteredLurnies] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setUserDetails(jwtDecode(accessToken));
    }
  }, []);

  useEffect(() => {
    // clearLurnies();
    if (userDetails) {
      let tempLurnies = lurnies;
      let filtered = tempLurnies.filter(
        (lurny) => lurny.user._id === userDetails.id
      );
      setMyLurnies(filtered);
    }
  }, [userDetails, lurnies]);

  return (
    <div className="min-w-[100vw] min-h-[100vh] font-raleway">
      <Header />
      <ToastContainer className="text-[2rem]" />
      <div className="w-full bg-[#262626] flex flex-1 justify-between px-[12rem] py-[6rem]">
        {/* Toggle button for mobile */}
        <div
          onClick={() => setShowSidePan(!showSidePan)}
          className="h-full bg-transparent sm:hidden fixed bottom-0 left-0 flex items-center z-50"
        >
          <IoIosArrowForward
            className={`text-[12rem] text-white hover:translate-x-[2rem] hover:duration-300 ${
              showSidePan
                ? "rotate-180 hover:translate-x-[-2rem] hover:duration-300"
                : ""
            }`}
          />
        </div>
        <div className="hidden sm:flex">
          <UserPan
            all={myLurnies.length}
            // saved={countSharedTrue}
            // showAll={(value) => setShowAll(value)}
          />
        </div>

        {/* UserPan is hidden on small screens initially */}
        <div
          className={`${showSidePan ? "absolute" : "hidden"} sm:block`}
        ></div>

        {/* My Lurnies */}
        <div className="w-full flex flex-col justify-between items-center">
          <h3 className="text-white text-[2.5rem] font-semibold">Settings</h3>
          <div className="flex">
            <div className="flex flex-col gap-[2rem]">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LurnySetting;
