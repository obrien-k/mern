import React from "react";
import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <div id="footer">
      <span className="links">
        <Link to="https://stellargra.ph">Codename Stellar</Link>
      </span>
    </div>
  );
};

export default PublicFooter;
