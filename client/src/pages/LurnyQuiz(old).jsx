// import PropTypes from "prop-types";
import { createRef } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip } from "react-tooltip";
import { jwtDecode } from "jwt-decode";

// import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

import { SlHome } from "react-icons/sl";
import { RxBookmark } from "react-icons/rx";
import { RiSparkling2Fill } from "react-icons/ri";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import LetterLogo from "../assets/icons/letter_logo.png";
import defaultImg from "../assets/images/Lurny/default.png";

import QuizItem from "../components/QuizItem";
import MobileQuizItem from "../components/MobileQuizItem";
import TranslateComponent from "../components/TranslateComponent";
import { logout } from "../reducers/userSlice";

function LurnyQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const backend_url = import.meta.env.VITE_BACKEND_URL;

  const { lurnies } = useSelector((state) => state.lurny);

  // const [language, setLanguage] = useState("en");

  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [relatedLurnies, setRelatedLurnies] = useState([]);

  const [itemRefs, setItemRefs] = useState([]);

  const [content, setContent] = useState(0);
  const [openRememberModal, setOpenRememberModal] = useState(false);

  // const [isExpand, setIsExpand] = useState(false);

  const { collections } = quizData;

  let { url } = useParams();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setUserData(jwtDecode(accessToken));
    }
  }, []);

  useEffect(() => {
    setItemRefs((refs) =>
      Array(lurnies.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef())
    );
  }, [lurnies]);

  useEffect(() => {
    const decodedUrl = decodeURIComponent(url);

    if (lurnies.length > 0 && decodedUrl) {
      const foundLurny = lurnies.find((lurny) => lurny.url === decodedUrl); // Utilize .find() for efficiency
      if (foundLurny) {
        setQuizData(foundLurny);
        const foundIndex = lurnies.indexOf(foundLurny);
        setSelectedIndex(foundIndex); // Get index using indexOf since the item was found

        // Check that the ref exists and is correctly assigned to an element
        if (itemRefs[foundIndex] && itemRefs[foundIndex].current) {
          itemRefs[foundIndex].current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  }, [lurnies, url, itemRefs]);

  useEffect(() => {
    const calculateRelevance = (lurnyCollections, targetCollections) => {
      return lurnyCollections.reduce((score, collection) => {
        return score + (targetCollections.includes(collection) ? 1 : 0);
      }, 0);
    };

    if (lurnies.length > 0 && quizData && quizData.collections) {
      let filteredLurnies = lurnies.filter(
        (lurny) => lurny.url !== quizData.url
      );
      let scoredLurnies = filteredLurnies.map((lurny) => ({
        ...lurny,
        relevanceScore: calculateRelevance(
          lurny.collections,
          quizData.collections
        ),
      }));

      scoredLurnies.sort((a, b) => b.relevanceScore - a.relevanceScore);

      // Get top 10 or fewer related lurnies
      const topRelatedLurnies = scoredLurnies
        .slice(0, 10)
        .filter((lurny) => lurny.relevanceScore > 0);

      setRelatedLurnies(topRelatedLurnies);
    } else {
      setRelatedLurnies([]); // Reset related lurnies if no relevant data is present
    }
  }, [lurnies, quizData]);

  useEffect(() => {
    function handleMessage(event) {
      if (
        event.source === window &&
        event.data.type &&
        event.data.type === "FROM_EXTENSION"
      ) {
        const data = event.data.payload;
        localStorage.setItem("tempData", JSON.stringify(data));
        navigate("/lurny/profile");
        // setTempData(JSON.stringify(data));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const isYoutubeUrl = (url) => {
    if (url) {
      return url.includes("youtube.com") || url.includes("youtu.be");
    }
  };

  const getDefaultImg = (image, url) => {
    if (isYoutubeUrl(url)) {
      return getThumbnailURLFromVideoURL(url);
    } else {
      return image;
    }
  };

  function getYoutubeVideoID(url) {
    const regExp =
      // eslint-disable-next-line no-useless-escape
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  function getThumbnailURLFromVideoURL(videoURL) {
    const videoID = getYoutubeVideoID(videoURL);
    if (!videoID) {
      // throw new Error("Invalid YouTube URL");
      return defaultImg;
    }
    return `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
  }

  const newImg = getDefaultImg(quizData.image, quizData.url);

  const buttons = ["Stubs", "Quiz Me!", "Remember this"];

  const handleClickHeadButton = (index) => {
    if (index < 2) {
      setContent(index);
    } else {
      setOpenRememberModal(true);
    }
  };

  const handleQuizItemClick = (index) => {
    if (index > 0 && index < lurnies.length - 1) {
      setQuizData(lurnies[index]);
      setSelectedIndex(index);
    }
  };

  const goBack = () => {
    if (selectedIndex === 0) {
      alert("This lurny is the first.");
    } else {
      setQuizData(lurnies[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goForward = () => {
    if (selectedIndex < lurnies.length - 2) {
      setQuizData(lurnies[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    } else {
      alert("This lurny is the end.");
    }
  };

  const handleClickModal = (e) => {
    if (e.target.id === "remember-modal") {
      setOpenRememberModal(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-[100vh] bg-black font-raleway flex flex-col justify-start">
      {/* Header */}
      <div className="w-full bg-black px-[12rem] sm:px-[20rem] flex justify-between items-center py-[4rem] lg:py-[1.5rem]">
        <Link to="/" className="select-none">
          <img
            src={LetterLogo}
            alt="Letter logo"
            className="w-[56rem] sm:w-[32rem] md:w-[24rem] lg:w-[18rem] xl:w-[12rem]"
          />
        </Link>

        {/* Button Group */}
        {quizData && Object.keys(quizData).length > 0 && (
          <div className="hidden sm:flex items-center gap-[4rem] sm:gap-[2rem]">
            <button
              onClick={goBack}
              data-tooltip-id="previous-lurny"
              className="flex items-center justify-center p-[0.5rem] sm:pl-2 text-white text-[10rem] sm:text-[3rem] bg-[#7F52BB] rounded-full focus:outline-none"
            >
              <IoIosArrowBack />
            </button>
            <Tooltip
              id="previous-lurny"
              place="bottom"
              content="Previous Lurny"
              style={{
                width: "150px",
                textAlign: "center",
                fontSize: "16px",
                backgroundColor: "#595959",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
              }}
            />
            {buttons.map((name, index) => (
              <span
                key={index}
                className={`${
                  content === index
                    ? "bg-[#595959] flex"
                    : "bg-transparent hidden sm:flex"
                } w-[52rem] sm:w-auto items-center justify-center text-white px-[2rem] py-[2.5rem] sm:py-[0.5rem] rounded-[2rem] sm:rounded-[0.5rem] text-[6.5rem] sm:text-[2rem] font-thin focus:outline-none border-none cursor-pointer`}
                onClick={() => handleClickHeadButton(index)}
              >
                {name}
              </span>
            ))}
            <button
              onClick={goForward}
              data-tooltip-id="next-lurny"
              className="flex items-center justify-center p-[0.5rem] sm:pl-2 text-white text-[10rem] sm:text-[3rem] bg-[#7F52BB] rounded-full focus:outline-none"
            >
              <IoIosArrowForward />
            </button>

            <Tooltip
              id="next-lurny"
              place="bottom"
              content="Next Lurny"
              style={{
                width: "150px",
                textAlign: "center",
                fontSize: "16px",
                backgroundColor: "#595959",
                color: "white",
                borderRadius: "4px",
                padding: "4px",
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-[8rem] lg:gap-[2rem]">
          {userData && (
            <Menu
              menuButton={
                <img
                  src={userData.photoURL}
                  alt="User avatar"
                  className="w-[16rem] sm:w-[12rem] md:w-[10rem] lg:w-[8rem] xl:w-[4rem] rounded-[100%] cursor-pointer"
                />
              }
              transition
              gap={8}
              align="center"
            >
              <MenuItem>
                <Link
                  to="/lurny/profile"
                  className="text-[1.5rem] text-black hover:text-black"
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <span
                  onClick={handleLogout}
                  className="text-[1.5rem] text-black"
                >
                  Logout
                </span>
              </MenuItem>
            </Menu>
          )}
          <Menu
            menuButton={
              <MenuButton>
                <IoMenu className="text-[4rem] text-gray-500" />
              </MenuButton>
            }
            transition
            gap={8}
            align="center"
          >
            <MenuItem>
              <span className="w-full py-[0.5rem] text-black text-[1.5rem]">
                About
              </span>
            </MenuItem>
            <MenuItem>
              <span className="w-full py-[0.5rem] text-black text-[1.5rem]">
                Terms of Service
              </span>
            </MenuItem>
            <MenuItem>
              <Link
                to="/privacy"
                className="w-full py-[0.5rem] text-black text-[1.5rem] hover:text-black"
              >
                Privacy
              </Link>
            </MenuItem>
            <MenuItem className="hover:bg-white">
              <span className="w-full py-[0.5rem] text-[1.5rem]">
                A&nbsp;
                <span className="text-[#7030A0] font-semibold">
                  CarillonMedia
                </span>
                &nbsp;Company
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-wrap px-[4rem] sm:px-[20rem] py-[2rem] gap-[8rem] sm:gap-0">
        {/* Image */}
        <div className="hidden sm:flex w-[36rem]">
          {quizData && Object.keys(quizData).length > 0 && (
            <div className="w-full px-[16rem] sm:px-0 flex flex-col ">
              <span className="text-white text-start text-[7rem] sm:text-[2.5rem] leading-[3rem]">
                {quizData.title}
              </span>
              {userData && (
                <img
                  src={
                    userData.email === "bentan010918@gmail.com"
                      ? defaultImg
                      : newImg
                  }
                  alt=""
                  className="w-full h-[64rem] sm:h-[20rem] object-cover rounded-[2rem] mt-[3rem]"
                />
              )}
              <div className="flex flex-col gap-8 mt-12">
                <a
                  href={quizData.url}
                  target="black"
                  className="bg-[#FFC36D] w-full text-black hover:text-gray-800 text-[2rem] py-4 rounded-md cursor-pointer"
                >
                  Watch Source
                </a>
                {/* Select language button */}
                {/* <div className="flex flex-col">
                  <span
                    className="bg-[#FFC36D] w-full text-black text-[2rem] py-4 rounded-md cursor-pointer"
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    Change Language
                  </span>
                  {isExpand && (
                    <ul className="bg-white mt-4 max-h-[48rem] overflow-y-auto">
                      {languageList.map((lang) => {
                        return (
                          <li
                            key={lang.code}
                            className="hover:bg-gray-200 text-black text-[2rem] py-4 cursor-pointer"
                            onClick={() => {
                              handleChangeLanguage(lang.code);
                              setIsExpand(false);
                            }}
                          >
                            {lang.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div> */}
                <TranslateComponent />
              </div>
            </div>
          )}
        </div>

        {/* Main part */}
        <div className="h-[85vh] hidden sm:flex flex-1 flex-col gap-[4rem] px-[20rem] scroll-hidden">
          {lurnies.map(
            (lurny, index) =>
              lurny.shared && (
                <div ref={itemRefs[index]} key={index}>
                  <QuizItem
                    key={index}
                    index={index}
                    currentQuizId={
                      quizData && Object.keys(quizData).length > 0
                        ? quizData._id
                        : null
                    }
                    handleClick={() => handleQuizItemClick(index)}
                    data={lurny}
                    // language={language}
                    content={content}
                  />
                </div>
              )
          )}
        </div>

        <div className="flex sm:hidden">
          {lurnies && lurnies.length > 0 && (
            <MobileQuizItem
              currentQuizId={
                quizData && Object.keys(quizData).length > 0
                  ? quizData._id
                  : null
              }
              data={lurnies[selectedIndex]}
              // language={language}
              content={content}
              index={selectedIndex}
              handleClick={handleQuizItemClick}
            />
          )}
        </div>

        {/* Right Panel */}
        <div className="hidden sm:flex w-[36rem]">
          {quizData && Object.keys(quizData).length > 0 && (
            <div className="flex flex-col items-start sm:gap-[4rem]">
              {/* Related Collections */}
              <div className="w-1/2 sm:w-full flex flex-col items-start text-white">
                <span className="text-start text-[8rem] sm:text-[3rem] font-bold">
                  Related Collections
                </span>
                <ul className="ml-[6rem] sm:ml-[2rem]">
                  {collections &&
                    collections.length > 0 &&
                    collections.slice(0, 9).map((keyword, index) => (
                      <li
                        onClick={() =>
                          navigate("/lurny/list", {
                            state: { category: keyword },
                          })
                        }
                        key={index}
                        className="text-gray-300 text-left text-[6rem] sm:text-[2rem] cursor-pointer"
                      >
                        {keyword}
                      </li>
                    ))}
                </ul>
              </div>

              {/* Related Lurnies */}
              {quizData && (
                <div className="w-1/2 sm:w-full flex flex-col items-start text-white">
                  <span className="text-start text-[8rem] sm:text-[3rem] font-bold">
                    Related Lurnies
                  </span>
                  <div className="h-[40rem] scroll-hidden flex flex-col gap-[1.5rem]">
                    {relatedLurnies.length > 0 &&
                      relatedLurnies.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-[2rem]"
                        >
                          <img
                            onClick={() => {
                              navigate(
                                `/lurny/feeds/${encodeURIComponent(item.url)}`
                              );
                              console.log(item);
                            }}
                            // src="###"
                            src={
                              userData.email === "bentan010918@gmail.com"
                                ? defaultImg
                                : getDefaultImg(item.image, item.url)
                            }
                            alt="lurny image"
                            className="w-[10rem] h-[6rem] rounded-lg cursor-pointer"
                          />
                          <span className="text-[1.5rem] text-left flex flex-1">
                            {item.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Remember Modal */}
      {openRememberModal && (
        <div
          className="w-full h-full bg-gray-100 bg-opacity-30 flex items-center justify-center absolute top-0 left-0 z-50"
          id="remember-modal"
          onClick={handleClickModal}
        >
          <div className="w-[80rem] p-[4rem] bg-[#404040] rounded-[1rem] flex flex-col items-center gap-[4rem] text-white text-[2rem]">
            <span className="">
              This Lurny is now saved in your Saved Lurnies folder for
              Repetition over Optimally Spaced Intervals (ROSI)
            </span>
            <div className="flex items-center justify-center gap-[4rem]">
              <button className="bg-[#7F51BA] focus:outline-none">
                Go to Saved Lurnies
              </button>
              <button className="bg-[#7F51BA] focus:outline-none">
                Go to ROSI Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full flex sm:hidden justify-around items-center mb-[8rem]">
        <div className="flex flex-col text-white text-[12rem] items-center gap-[2rem]">
          <Link to="/">
            <SlHome id="home" className="text-white" />
          </Link>
          <label htmlFor="home" className="text-[8rem]">
            Home
          </label>
        </div>
        <RiSparkling2Fill
          className="text-yellow-400 text-[24rem]"
          onClick={() => setContent(1)}
        />
        <div className="flex flex-col text-white text-[12rem] items-center gap-[2rem]">
          <RxBookmark id="collection" />
          <label htmlFor="collection" className="text-[8rem]">
            Collection
          </label>
        </div>
      </div>
    </div>
  );
}

// LurnyQuiz.propTypes = {};

export default LurnyQuiz;
