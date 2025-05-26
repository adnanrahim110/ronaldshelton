import { AiOutlineFacebook } from "react-icons/ai";
import { author } from "../assets";
import HomeHero from "../components/layouts/HomeHero";
import Posts from "../components/layouts/Posts";
import Reviews from "../components/layouts/Reviews";
import Button from "../components/ui/Button";
import SecTitle from "../components/ui/SecTitle";

const Home = () => {
  return (
    <>
      <HomeHero />
      <section className="relative py-14 lg:py-[80px_120px]" id="author">
        <div className="container">
          <div className="row">
            <div className="max-w-full text-left">
              <div className="relative lg:pt-[100px] mb-10">
                <SecTitle
                  className="mb-0 lg:pl-[130px] lg:max-w-[57%] lg:before:left-[60px] before:absolute before:top-1/3 before:-translate-y-1/2 before:left-20 before:h-0.5 before:w-[45px] before:bg-gray-900"
                  title="About me"
                  tagline="<span class='text-primary-600 text-xs'>Ronald Shelton</span> - Award Winning Author"
                />
                <div className="relative lg:absolute top-0 right-0 h-[600px] lg:w-[42%] after:absolute after:-bottom-[15px] after:left-1/2 after:-translate-x-1/2 after:w-[30%] after:h-0.5 after:bg-gray-900">
                  <div
                    className="absolute inset-0 bg-cover bg-[top_center] bg-no-repeat"
                    style={{ backgroundImage: `url(${author})` }}
                  />
                </div>
                <div className="relative lg:w-[57%] z-[1] lg:pl-[130px] my-10">
                  <Button
                    target="_blank"
                    href="http://www.facebook.com/ronaldshelton2019"
                    icon={AiOutlineFacebook}
                    className="pl-8 group"
                    iconClass="group-hover:text-[#3b5998] text-3xl"
                  >
                    Connect on facebook
                  </Button>
                </div>
                <div className="relative lg:w-[65%] italic text-lg leading-[1.66em] tracking-wide p-10 lg:py-[60px] lg:px-20 bg-primary-100 z-[1] font-gentium">
                  <p className="mb-0">
                    Ronald Shelton is a life-long outdoorsman, prepper and
                    wilderness survivalist. His belief in preparedness comes
                    from deeply instilled Christian values and biblical
                    principles. In his debut novel, Exodus and Exiles, the first
                    book in The Bug Out Chronicles, he transports the reader
                    through long-term wilderness survival after the collapse of
                    U.S. government, economy and society. Follow him on Facebook{" "}
                    <a
                      href="http://www.facebook.com/ronaldshelton2019"
                      target="_blank"
                      className="underline underline-offset-2 decoration-transparent hover:decoration-[#1877f2] text-[#3b5998] hover:text-[#1877F2]"
                    >
                      @Ronaldsheltonauthor
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://thebugoutchronicles.com"
                      className="underline underline-offset-2 decoration-transparent hover:decoration-black text-gray-500 hover:text-black"
                      target="_blank"
                    >
                      www.thebugoutchronicles.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Reviews />
      <Posts />
    </>
  );
};

export default Home;
