import React from "react";
import { Breadcrumb } from "react-bootstrap";

const BreadcrumbComponent = ({ items, headingText }) => {
  return (
    <div className="container mt-5">
      <Breadcrumb
        className="menu-breadcrumb-items"
        style={{ marginTop: "6rem" }}
      >
        {items.map((item, index) => {
          if (item.active) {
            return (
              <Breadcrumb.Item key={index} className="breadcrumb-link" active>
                {item.label}
              </Breadcrumb.Item>
            );
          } else {
            return (
              <Breadcrumb.Item
                key={index}
                className="breadcrumb-link"
                href={item.href}
              >
                {item.label}
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
      <h2
        className="text-center slider-heading"
        style={{ color: "#C08735", padding: "0px" }}
      >
        {headingText}
      </h2>
    </div>
  );
};

export default BreadcrumbComponent;
