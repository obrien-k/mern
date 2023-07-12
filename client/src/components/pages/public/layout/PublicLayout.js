import React from "react";
import { Link } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

const PublicLayout = ({ pageTitle, children }) => {
  return (
    <div>
      <div>
        <PublicHeader />
      </div>
      <div className="maincontent">
        <div id="logo">
          <Link to="/">
            <img
              className="hidden"
              src="/static/styles/kuro/images/logo.png"
              alt="stellar"
              title="stellar"
            />
          </Link>
        </div>
        <div className="container">{children}</div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
