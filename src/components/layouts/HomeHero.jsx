import { LuBookOpenText } from "react-icons/lu";
import { Link } from "react-router-dom";
import { bg_home_hero, book } from "../../assets";
import Button from "../ui/Button";
import SecTitle from "../ui/SecTitle";

const HomeHero = () => {
  return (
    <section className="py-[196px_100px] relative">
      <div className="container">
        <div className="row items-center">
          <div className="md:w-1/2 text-left">
            <SecTitle
              title="The Bug Out Chronicles"
              tagline="EXODUS & EXILES"
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
              <Button>Buy now</Button>
              <Button btn2 icon={LuBookOpenText}>
                Read a Chapter
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
              <div className="inline-block relative after:table after:clear-both">
                <div className="perspective-distant group">
                  <Link
                    to="/"
                    className="relative inline-block transition-all duration-200 origin-[35%_50%] transform-3d after:w-[66px] after:z-[0] after:absolute after:-top-0.5 after:left-[98.5%] after:-bottom-0.5 after:bg-[repeating-linear-gradient(to_right,_#f5f5f5,_#f5f5f5_5px,_#aaa_5px,_#aaa_6px)] after:origin-[0%_50%] transform after:rotate-y-90 group-hover:-rotate-y-[35deg]"
                  >
                    <div className="bg-primary lg:w-[65%] absolute top-[50%] -right-[15px] uppercase py-2.5 px-5 text-white text-[13px] w-1/2 text-left tracking-[1px] group-hover:rotate-y-[35deg] group-hover:translate-3d transition-all duration-200 z-[2] origin-[100%_0] after:absolute after:top-full after:right-0 after:border-t-[15px] after:border-r-[15px] after:border-transparent after:border-t-primary-600">
                      <span className="ml-2.5">read the book</span>
                    </div>
                    <img
                      src={book}
                      alt=""
                      className="group-hover:rounded-r-lg relative z-[1]"
                    />
                    <div className="absolute z-[1] bg-white right-0 bottom-[30%] transform p-[35px] lg:p-[25px]">
                      <div className="uppercase text-gray-950 text-[40px] font-cinzel max-2xl:text-3xl lg:text-3xl">
                        <span>
                          <span className="text-primary text-[32px] leading-5 px-[5px]">
                            $
                          </span>
                          18.00
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
