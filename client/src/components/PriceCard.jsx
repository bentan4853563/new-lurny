import PropTypes from "prop-types";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CgCloseO } from "react-icons/cg";

function PriceCard({ plan, priceMode, level }) {
  const rate = priceMode === "monthly" ? 1 : 10;

  return (
    <div className="w-full sm:w-[32rem] bg-white p-[12rem] sm:p-[2rem] border border-gray-300 rounded-[4rem] sm:rounded-[1rem] flex flex-col items-start gap-[4rem] text-black hover:border-2 hover:border-[#7F52BB] cursor-pointer relative">
      {level === "pro" && (
        <button className="absolute top-0 right-0 bg-[#7F52BB] rounded-md text-white text-[2rem]">
          Best Value
        </button>
      )}
      <h2 className="text-[6rem] sm:text-[2.5rem] font-bold">
        {level.toUpperCase()}
      </h2>
      <div className="text-[12rem] sm:text-[4rem] ml-auto flex items-center">
        <span className="text-[8rem] sm:text-[2rem]">$</span>
        <span>{plan.price * rate}</span>
      </div>
      <ul className="flex flex-col gap-[10rem] sm:gap-[2rem]">
        {plan.options.map((option, index) => {
          let limit = Object.keys(option)[0];
          return (
            <li key={index}>
              <div className="flex items-center gap-2 text-[8rem] sm:text-[2rem]">
                {option[limit] ? (
                  <FaRegCircleCheck className="text-[#7F52BB]" />
                ) : (
                  <CgCloseO className="text-red-500" />
                )}
                {limit}
              </div>
            </li>
          );
        })}
      </ul>
      <button className="w-full border bg-white border-gray-200 text-[8rem] sm:text-[2rem] py-[1rem] focus:outline-none mt-[8rem] sm:mt-[2rem]">
        SELECT PLAN
      </button>
    </div>
  );
}

PriceCard.propTypes = {
  plan: PropTypes.object,
  priceMode: PropTypes.string,
  level: PropTypes.string,
};

export default PriceCard;
