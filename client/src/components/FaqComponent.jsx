import { useState } from "react";
import FaqItem from "./FaqItem";

const FaqComponent = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "What is Lurny?",
      answer:
        "Lurny is a digital platform that transforms any online content—articles, videos, or documents—into concise, learnable called Lurnies, which include key learning points and quizzes.",
    },
    {
      id: 2,
      question: "How does Lurny enhance learning?",
      answer:
        "Lurny simplifies complex information into digestible stubs, offers quizzes for self-assessment, and uses the ROSI algorithm for effective memory retention, ensuring you not only learn but remember.",
    },
    {
      id: 3,
      question: "Who can create a Lurny?",
      answer:
        "Anyone can create a Lurny! Just install our browser extension, click on it while viewing your desired content, and it instantly converts into a structured Lurny with summaries and quizzes.",
    },
    {
      id: 4,
      question: "Is Lurny free to use?",
      answer:
        "Lurny offers a free plan with access to numerous features. Additional premium features, including unlimited ROSI saves and advanced quizzes, are available through our subscription plans.",
    },
    // Add more FAQs here
  ];
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full flex flex-col gap-[4rem] px-[8rem] sm:px-0 md:gap-[1.5rem] my-[8rem] sm:my-0">
        {faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={faq.id === openFaqId}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>
      <button className="w-[72rem] sm:w-[36rem] xl:w-[24rem] bg-[#7F52BB] mt-[4rem] text-[8rem] sm:text-[4rem] lg:text-[3rem] xl:text-[2rem] font-bold text-white focus:outline-none">
        See All FAQs
      </button>
    </div>
  );
};

export default FaqComponent;
