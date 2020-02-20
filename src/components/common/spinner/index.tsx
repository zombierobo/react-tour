import React from "react";
import "./styles.css";

const Spinner: React.SFC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="spinner">
      <span role="img" aria-label="">
        ⌛
      </span>
      {children && <span>{children}</span>}
    </div>
  );
};

export default Spinner;
