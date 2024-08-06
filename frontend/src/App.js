import React from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benifits from "./components/Benefits";
import ChatAi from "./components/ChatAi";
import { useRef } from "react";
import GeneratedScript from "./components/GeneratedScript";

const App = () => {
  const chatAiRef = useRef(null);

  const scrollToChatAi = () => {
    if (chatAiRef.current) {
      chatAiRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="h-full ">
        <div className="pt-[4.75rem] lg:pt-[5.25rem] ">
          <Header />
          <Hero scrollToChatAi={scrollToChatAi} />
          <Benifits />
          <GeneratedScript />
          <div ref={chatAiRef}>
            <ChatAi />
          </div>
        </div>
        <ButtonGradient />
      </section>
    </>
  );
};

export default App;
