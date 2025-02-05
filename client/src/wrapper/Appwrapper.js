import React from "react";

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component />
          <div
            className="copyright"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <p className="p-text">@2023 - 2024 KYUSDA CHURCH</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
      </div>
    );
  };
export default AppWrap;
