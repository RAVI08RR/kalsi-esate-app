import React from "react";
import { useParams } from "react-router-dom";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Newsblogs from "./Newsblogs";

const BlogDetailComponent = ({ newsBlogData, loading }) => {
  const { id } = useParams();
 
  const selectedBlog = newsBlogData[parseInt(id)];

  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Blog Detail", active: true },
  ];

  return (
    <>
      <div className="container mt-5  mb-2 pb-2 blog-heading-detail">
        <BreadcrumbComponent
          items={breadcrumbItems}
          headingText={newsBlogData.title}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : newsBlogData ? (
        <div className="container p-5 mb-5 pt-2 kss-bg-light-gray blog-section">
          <div className="row">
            {/* <h2>{newsBlogData.title}</h2> */}

            <ul className="blog-details-list">
              <li>
                <img
                  src="/assets/images/date-blog.svg"
                  alt="img"
                  className="blog-icons"
                />
                Posted by demo on{" "}
                {new Date(newsBlogData.publish).toDateString()}
              </li>
              <li>
                <img
                  src="/assets/images/comment.svg"
                  alt="img"
                  className="blog-icons"
                />
                Buying Properties, Location, Price, Real Estate, Uncategorized
              </li>
            </ul>

            <img
              src={newsBlogData.image}
              alt="blog-detail"
              className="w-100 h-100"
            />
            {/* <p>{newsBlogData.description}</p> */}

            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: newsBlogData.description }}
            />
            {/* Add more content based on the selectedBlog object */}

            <div className="social">
              <ul className="contact-menu-blog">
                <li className="social-icons-blog">
                  <a
                    href="https://www.facebook.com/kalsiestate21"
                    className="text-black-nav"
                    target="_blank"
                  >
                    <img
                      src="/assets/images/footer-images/Facebook.svg"
                      className="header-socail-icons"
                      alt="img"
                    />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.instagram.com/kalsiestate/"
                    className="text-black-nav"
                    target="_blank"
                  >
                    <img
                      src="/assets/images/footer-images/instagram.svg"
                      alt="Facebook"
                      className="header-socail-icons"
                    />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://x.com/kalsiestate"
                    className="text-black-nav"
                  >
                    <img
                      src="/assets/images/footer-images/twiteer.svg"
                      alt="Facebook"
                      className="header-socail-icons"
                    />
                  </a>
                </li>
                <li className="social-icons">
                  <a
                    href="https://www.youtube.com/channel/UCU1XfOJ-U_XeePncXMT4EIg"
                    className="text-black-nav"
                    target="_blank"
                  >
                    <img
                      src="/assets/images/footer-images/youtube.svg"
                      className="header-socail-icons"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>No blog data found.</p>
      )}

      {/* <div className="realated-projects mt-5">
        <Newsblogs title="Related Posts" />
      </div> */}
    </>
  );
};

export default BlogDetailComponent;
