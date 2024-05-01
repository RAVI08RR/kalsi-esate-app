import React from "react";

const Newsblogs = () => {
  return (
    <div className="blog-section pt-5">
      <div className="container">
        <h2 className="slider-heading">News and Blogs</h2>
        <div className="row">
          <div className="col-lg-4">
            <div className="crad blogs-cards">
              <img
                src="/assets/images/blog-1.png"
                className="card-blog-image"
              />
              <div className="card-body blog-content">
                <h6>Set Up a Balcony Garden in Your self Apartments</h6>
                <span className="blog-card-date-">08- 04-2024</span>
                <p className="card-blog-discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="crad blogs-cards">
              <img
                src="/assets/images/blog-2.png"
                className="card-blog-image"
              />
              <div className="card-body blog-content">
                <h6>
                  Real Estate market in 2022: global trends and predictions
                </h6>
                <span className="blog-card-date-">08- 04-2024</span>
                <p className="card-blog-discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="crad blogs-cards">
              <img
                src="/assets/images/blog-3.png"
                className="card-blog-image"
              />
              <div className="card-body blog-content">
                <h6>Diamond Manor Apartment in the Hyderabad and Service</h6>
                <span className="blog-card-date-">08- 04-2024</span>
                <p className="card-blog-discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsblogs;
