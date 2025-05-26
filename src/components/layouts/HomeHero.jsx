import { useContext } from "react";
import { FaSpinner } from "react-icons/fa6";
import { LuBookOpenText } from "react-icons/lu";
import { bg_home_hero } from "../../assets";
import { books } from "../../constant";
import { ReadBookContext } from "../../context/ReadBookContext";
import BookHover from "../ui/BookHover";
import Button from "../ui/Button";
import SecTitle from "../ui/SecTitle";

const HomeHero = () => {
  const { openPanel, isLoading } = useContext(ReadBookContext);
  return (
    <section className="py-[196px_100px] relative">
      <div className="container">
        <div className="row items-center flex-col-reverse md:flex-row">
          <div className="md:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
            <SecTitle
              title="The Bug Out Chronicles"
              tagline="EXODUS & EXILES"
              className="mb-5 lg:mb-[60px]"
            />
            <div className="clear-both overflow-hidden">
              <p>
                Winner of 5-Star Reader's Favorite Award ​ The Bug Out
                Chronicles EXODUS & EXILES After the Black War and ensuing
                chaos, John Thompson leads his California family to a safe haven
                in the Sierra Nevada Mountains and instructs his son’s and
                daughter’s families, in the east, to escape to the Appalachians.
                The Protectorate have laid siege to all large U.S. cities,
                leaving inhabitants to die of starvation and disease. Few, if
                any escape. Through John’s instructions, the families prepare
                for long-term exile during the Tribulation. It is their faith
                that led them to this preparation and prophesies that triggered
                their exodus.
              </p>
            </div>
            <div className="h-5" />
            <div className="flex gap-2.5 mt-3.5 items-center">
              <Button href="/book" className="max-md:text-sm">
                Buy now
              </Button>
              <Button
                className="max-md:text-sm"
                btn2
                icon={isLoading ? FaSpinner : LuBookOpenText}
                iconClass={
                  isLoading ? "animate-spin [animation-duration:2.2s]" : ""
                }
                onClick={openPanel}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Read a Chapter"}
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 text-left">
            <div className="absolute opacity-60 -z-[1] top-[10%] -left-[40%] -right-[20%] bottom-[45%] lg:-left-[30%] lg:-right-[10%]">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${bg_home_hero})` }}
              ></div>
            </div>
            <div className="text-center relative">
              <BookHover
                price={books[0].price}
                discountedPrice={books[0].discountedPrice}
                img={books[0].img}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
