/* eslint-disable no-useless-escape */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import defaultImg from "../assets/images/Lurny/default.png";

function LurnyItem({ data }) {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);

  const { _id, title, image, url } = data;

  const handleClick = () => {
    navigate(`/lurny/feeds/${_id}`);
  };

  const isYoutubeUrl = (url) => {
    if (url) {
      return url.includes("youtube.com") || url.includes("youtu.be");
    } else {
      return false;
    }
  };

  function checkImageUrl(url, callback) {
    var img = new Image();

    // Define the event listener for the 'load' event
    img.onload = function () {
      callback(true); // Image URL is correct and image is loaded
    };

    // Define the event listener for the 'error' event
    img.onerror = function () {
      callback(false); // Image URL is incorrect or image cannot be loaded
    };

    img.src = url;
  }

  const getDefaultImg = (image, url) => {
    if (isYoutubeUrl(url)) {
      return getThumbnailURLFromVideoURL(url);
    } else {
      checkImageUrl(image, function (isValid) {
        if (isValid) {
          return image;
        } else {
          return defaultImg;
        }
      });
    }
  };

  function getYoutubeVideoID(url) {
    const regExp =
      // eslint-disable-next-line no-useless-escape
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=|shorts\/)([^#\&\?]*).*/;
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

  const newImg = getDefaultImg(image, url);
  // userDetails && console.log(userDetails.email);
  return (
    <div
      onClick={handleClick}
      className="w-[150rem] sm:w-[48rem] lg:w-[30rem] cursor-pointer"
    >
      {userDetails && (
        <img
          src={
            userDetails.email === "bentan010918@gmail.com" ? defaultImg : newImg
          }
          // src={newImg}
          alt="lurny image"
          className="h-[80rem] sm:h-[24rem] lg:h-[16rem] w-full object-cover rounded-[8rem] sm:rounded-[1.5rem]"
        />
      )}
      <div className="w-full flex flex-col text-white items-start gap-[2rem] sm:gap-[1rem] p-[4rem] sm:p-[2rem]">
        <span className="w-full text-start text-[6rem] sm:text-[3rem] lg:text-[1.2rem] font-semibold truncate">
          {url}
        </span>
        <div className="w-full text-[10rem] sm:text-[5rem] lg:text-[2rem] leading-[11rem] sm:leading-[6rem] lg:leading-[2.5rem] text-left font-medium  line-clamp-3 sm:line-clamp-2">
          {title}
        </div>
      </div>
    </div>
  );
}

LurnyItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LurnyItem;
