import { Outlet } from "react-router-dom";

import { css } from "@emotion/react";

import { useEffect } from "react";
import NavbarComponent from "../components/Navbar";

const contentAreaStyle = () => css`
  position: relative;
`;

const pageWrapperStyle = () => css`
  min-height: 100vh;
  overflow: hidden;
`;

const wrapperStyle = () => css`
  min-height: calc(100vh - 90px);
  margin: 0 auto;

  overflow-x: hidden;
  overflow-y: scroll;
`;

const MainLayout = () => {
  useEffect(() => {}, []);

  return (
    <main>
      {
        <div className="pageWrapper bg-white" css={pageWrapperStyle}>
          {/********Sidebar**********/}

          {/********Content Area**********/}

          <div className="contentArea bg-white" css={contentAreaStyle}>
            {/********header**********/}

            <NavbarComponent />

            {/********Middle Content**********/}
            <div className="w-full wrapper" css={wrapperStyle}>
              <Outlet />
            </div>
          </div>
        </div>
      }
    </main>
  );
};

export default MainLayout;
