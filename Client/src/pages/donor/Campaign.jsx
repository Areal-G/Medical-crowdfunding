import Carousel from "../../components/Carousel";
import DonatedCard from "../../components/DonatedCard";
import HospitalProfile from "../../components/HospitalProfile";
import DonationProgress from "../../components/DonationProgress";

const slides = [
  "https://images.gofundme.com/ftYeZBNXEHS4IhOpemnFEBjOyHQ=/720x405/https://d2g8igdw686xgo.cloudfront.net/79674207_1713821734459328_r.jpeg",
  "https://images.gofundme.com/ftYeZBNXEHS4IhOpemnFEBjOyHQ=/720x405/https://d2g8igdw686xgo.cloudfront.net/79674207_1713821734459328_r.jpeg",
  "https://images.gofundme.com/ftYeZBNXEHS4IhOpemnFEBjOyHQ=/720x405/https://d2g8igdw686xgo.cloudfront.net/79674207_1713821734459328_r.jpeg",
  "https://images.gofundme.com/ftYeZBNXEHS4IhOpemnFEBjOyHQ=/720x405/https://d2g8igdw686xgo.cloudfront.net/79674207_1713821734459328_r.jpeg",
  "https://images.gofundme.com/ftYeZBNXEHS4IhOpemnFEBjOyHQ=/720x405/https://d2g8igdw686xgo.cloudfront.net/79674207_1713821734459328_r.jpeg",
];

const Campaign = () => {
  return (
    // container
    <div className="mx-auto mt-10  max-w-screen-xl">
      <h2 className=" mx-auto mb-8 w-[90%] text-center text-3xl font-semibold  dark:text-white ">
        Jake Parker’s Memorial Fundraiser
      </h2>
      <div className="  justify-between lg:flex">
        <div className="left flex flex-col  lg:w-[70%]">
          <div className="mx-auto h-auto w-[80%] rounded-lg shadow-lg">
            <Carousel>
              {[...slides.map((s, i) => <img key={i} src={s} />)]}
            </Carousel>
          </div>

          <p className=" mx-auto mt-8 w-[80%]">
            There aren’t many words to describe how special of a man Jake Parker
            was to family, friends, and everyone he met. The sheer amount of
            love being displayed over this horrific tragedy has truly been a
            testament to the charismatic, loving, and intelligent human being he
            was. Jake naturally positioned himself at the core of everyone’s
            lives, not because he tried to, but because he was someone that
            everyone could not help but want around them. He succeeded in
            everything he set out to do, humbly, as a man who encapsulated what
            it meant to be driven and hard-working. In so many different
            avenues, passions, and projects, Jake’s future was limitless.
            However, during this time, we would appreciate any contribution that
            you might be able to make to aid and support the family surrounding
            this harsh and
          </p>
        </div>
        <div className="right lg:w-[30%]">
          <div className=" mx-auto  w-[90%] ">
            {/* progress bar    and look at the mt10 */}
            <DonationProgress />

            <div>
              <HospitalProfile />
            </div>
            {/* Donations */}
            <div className="">
              <DonatedCard />
              <DonatedCard />
              <DonatedCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Campaign;
