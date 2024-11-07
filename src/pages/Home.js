// Home folder will display each pages of the SCR
// component , inside of pages,

import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

import FeaturedBlogs from '../components/FeaturedBlogs';



export default function Home() {
  const homeData = {
    title: "Personal Blog",
    content: "Daily thoughts, inspirational stories",
    destination: "/blogs",
    buttonLabel: "Write now!"
  };

  return (
    <>
      <Banner data={homeData} />
      <FeaturedBlogs />
      <Highlights />
      {/* Any other components */}
    </>
  );
}
