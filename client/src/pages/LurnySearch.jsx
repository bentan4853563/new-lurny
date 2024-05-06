import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { IoIosArrowForward } from "react-icons/io";
import { ImSearch } from "react-icons/im";

import LurnyItem from "../components/LurnyItem";
// import CategoryPan from "../components/CatetoryPan";
import NewPagination from "../components/NewPagination";
import Header from "../components/Header";

// import Pagination from "../components/Pagination";

const LurnySearch = () => {
  const { lurnies } = useSelector((state) => state.lurny);
  const [publishedLurnies, setPublishedLurnies] = useState([]);

  // const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [filteredLurnies, setFilteredLurnies] = useState([]);

  // Pagenation state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust as needed
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLurnies.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (lurnies.length > 0) {
      setPublishedLurnies(lurnies.filter((item) => item.shared === true));
    }
  }, [lurnies]);

  useEffect(() => {
    const matchesSearchTerm = (collection) =>
      collection.toLowerCase().includes(searchTerm.toLowerCase());

    if (searchTerm.trim() !== "") {
      const filteredBySearch = publishedLurnies.filter(
        (lurny) =>
          lurny.collections.some(matchesSearchTerm) ||
          lurny.summary.some(matchesSearchTerm) ||
          lurny.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLurnies(filteredBySearch);
    } else {
      setFilteredLurnies(publishedLurnies);
    }
  }, [searchTerm, publishedLurnies]);

  return (
    <div className="h-[100vh] font-raleway">
      <Header />
      <ToastContainer className="text-start" />

      <div className="w-full bg-[#262626] flex flex-col px-[12rem] py-[4rem] gap-[4rem]">
        {/* Search bar */}
        <div className="bg-[#1A1A1A] w-full px-[1.5rem] py-[1rem] flex flex-item items-center rounded-[0.5rem]">
          <ImSearch className="text-white text-[3rem]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white text-[2.5rem] px-[1.5rem] flex flex-1 focus:outline-none"
            placeholder="Search topics and people"
          />
        </div>
        {/* Toggle button for mobile */}
        {/* <div
            onClick={() => setShowFilter(!showFilter)}
            className="h-full bg-transparent sm:hidden fixed bottom-0 left-0 flex items-center z-50"
          >
            <IoIosArrowForward
              className={`text-[12rem] text-white hover:translate-x-[2rem] hover:duration-300 ${
                showFilter
                  ? "rotate-180 hover:translate-x-[-2rem] hover:duration-300"
                  : ""
              }`}
            />
          </div> */}

        {/* FilterPan is hidden on small screens initially */}
        {/* <div className={`${showFilter ? "absolute" : "hidden"} sm:block`}>
            <CategoryPan />
          </div> */}

        <div className="w-full flex flex-col justify-between items-center">
          <div className="w-full flex flex-wrap justify-start gap-[8rem] lg:gap-[6rem]">
            {currentItems.map(
              (lurny, index) =>
                lurny.shared && <LurnyItem key={index} data={lurny} />
            )}
          </div>
          {filteredLurnies.length > itemsPerPage && (
            <NewPagination
              totalItems={filteredLurnies && filteredLurnies.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              paginate={(value) => paginate(value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LurnySearch;
