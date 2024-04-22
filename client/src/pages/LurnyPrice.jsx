import Header from "../components/Header";
import { useState } from "react";
import PriceCard from "../components/PriceCard";

export default function LurnyPrice() {
  const [priceMode, setPriceMode] = useState("monthly");

  const pricingData = {
    explorer: {
      options: [
        { "Unlimited Stubs": true },
        { "50 Quiz Sets": true },
        { "50 Saves to ROSI": true },
        { "Socratic AI": false },
        { "StubIT Browser Extension": false },
      ],
      price: 0,
    },
    enthusiast: {
      options: [
        { "Unlimited Stubs": true },
        { "Unlimited Quiz Sets": true },
        { "Unlimited Saves to ROSI": true },
        { "Socratic AI": false },
        { "StubIT Browser Extension": false },
      ],
      price: 3,
    },
    pro: {
      options: [
        { "Unlimited Stubs": true },
        { "Unlimited Quiz Sets": true },
        { "Unlimited Saves to ROSI": true },
        { "50 Socratic AI": true },
        { "StubIT Browser Extension": false },
      ],
      price: 10,
    },
    master: {
      options: [
        { "Unlimited Stubs": true },
        { "Unlimited Quiz Sets": true },
        { "Unlimited Saves to ROSI": true },
        { "Unlimited Socratic AI": true },
        { "StubIT Browser Extension": true },
      ],
      price: 15,
    },
  };

  const handleChangePricingMode = (e) => {
    setPriceMode(e.target.name);
  };

  return (
    <div className="">
      <Header />
      <div className="h-[90vh] p-[8rem] bg-white flex flex-col items-center gap-[4rem] sm:gap-[2rem]">
        <h1 className="text-black text-[10rem] sm:text-[4rem]">
          Choose the plan that best fits your needs
        </h1>

        <div className="flex items-center gap-[2rem]">
          <button
            name="monthly"
            onClick={handleChangePricingMode}
            className={`${
              priceMode === "monthly"
                ? "bg-[#FFC35E]"
                : "bg-white border border-gray-300"
            }  text-black rounded-[2rem] sm:rounded-[0.5rem] px-[4rem] py-[1rem] text-[6rem] sm:text-[1.5rem] focus:outline-none`}
          >
            MONTHLY
          </button>
          <button
            name="annually"
            onClick={handleChangePricingMode}
            className={`${
              priceMode === "annually"
                ? "bg-[#FFC35E]"
                : "bg-white border border-gray-300"
            }  text-black rounded-[2rem] sm:rounded-[0.5rem] px-[4rem] py-[1rem] text-[6rem] sm:text-[1.5rem] focus:outline-none`}
          >
            ANNUALLY
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-[8rem] sm:gap-[2rem] px-[8rem] py-[8rem] sm:py-[2rem]">
          {Object.keys(pricingData).map((level, index) => {
            return (
              <PriceCard
                key={index}
                priceMode={priceMode}
                level={level}
                plan={pricingData[level]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
