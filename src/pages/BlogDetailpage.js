import React from "react";
import Header from "../components/Header";
import Blogdetailcomponent from "../components/Blogdetailcomponent";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
const BlogDetailpage = ({cities}) => {
  const location = useLocation();
  const { item } = location.state;
  console.log(item);
  return (
    <>
      <ScrollToTop />
      <Header showBg={true} cities={cities}/>
      <Blogdetailcomponent newsBlogData={item} />
    </>
  );
};

export default BlogDetailpage;
