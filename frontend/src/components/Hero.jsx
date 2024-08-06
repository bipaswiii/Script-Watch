import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef, useState } from "react";
import Generating from "./Generating";
import { Modal, Spinner } from "flowbite-react";
import { GiFingerPrint, GiTruce } from "react-icons/gi";
import { useDetectFingerprintMutation } from "../api/fingerPrinting";

const Hero = ({ scrollToChatAi }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const parallaxRef = useRef(null);

  const [detectFingerprint] = useDetectFingerprintMutation();

  const handleDetectClick = async () => {
    setIsLoading(true);
    try {
      await detectFingerprint().unwrap();
    } catch (err) {
      console.error("Failed to run the script:", err);
    } finally {
      setIsLoading(false);
      setOpenModal(false);
    }
  };
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Explore the ways for browser finger printing &
            &nbsp;AI&nbsp;Chatting with {` `}
            <span className="inline-block relative">
              Script-Watch{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of AI within Script Watch. Upgrade your
            productivity with Script blab, the open AI chat app.
          </p>
          <div className="flex justify-center gap-3">
            <Button white onClick={() => setOpenModal(true)}>
              Detect
            </Button>

            <Button white onClick={scrollToChatAi}>
              Ask me
            </Button>
          </div>
        </div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          className="flex items-center justify-center min-h-screen"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <Modal.Header className="text-center">Detect</Modal.Header>
          <Modal.Body className="bg-indigo-950 p-6 rounded-lg">
            <div className="text-center">
              <GiFingerPrint className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-200 dark:text-gray-400">
                Proceed with the detection?
              </h3>
              <div className="flex justify-center gap-4">
                <Button white onClick={handleDetectClick} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Spinner aria-label="Spinner button example" /> Loading...
                    </div>
                  ) : (
                    "Yes, I'm sure"
                  )}
                </Button>
                <Button white onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex"></ul>
                </ScrollParallax>
              </div>
            </div>
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
