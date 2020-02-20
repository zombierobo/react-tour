import React, { useState } from "react";
import { Route, Switch, NavLink, withRouter } from "react-router-dom";
import { Home } from "./home";
import Research from "./research";
import { About } from "./about";
import "./styles.css";
import PageNotFound from "./PageNotFound";
import ClickMeIfYouCan from "./click-me-if-you-can";
import { Tour } from "./tour";
import Modal, { ArrowDirection } from "./modal/Modal";
import { mockData } from "./tour/mock-data";

const toDataTourId = (nav: string) => `tour__nav-link__${nav}`;

const arrowsDirections: ArrowDirection[] = [
  "left",
  "top-left",
  "top",
  "top-right",
  "right",
  "bottom-right",
  "bottom",
  "bottom-left"
];

const Main = () => {
  const [showTour, setShowTour] = useState(false);

  // const [modalDirection, setModalDirection] = useState<ArrowDirection>(
  //   arrowsDirections[0]
  // );
  // const nextModalDirection = () => {
  //   const currentIdx = arrowsDirections.findIndex(d => d === modalDirection);
  //   setModalDirection(
  //     arrowsDirections[(currentIdx + 1) % arrowsDirections.length]
  //   );
  // };

  const onLaunchTour = () => setShowTour(true);
  const onDismissTour = () => setShowTour(false);
  const onCompleteTour = () => setShowTour(false);

  return (
    <div>
      <header>
        <nav>
          <NavLink exact to="/" data-tour-id={toDataTourId("home")}>
            Home
          </NavLink>
          <NavLink exact to="/research" data-tour-id={toDataTourId("research")}>
            Research
          </NavLink>
          <NavLink exact to="/play" data-tour-id={toDataTourId("play")}>
            Play
          </NavLink>
          <NavLink exact to="/about" data-tour-id={toDataTourId("about")}>
            About
          </NavLink>
        </nav>
        <button onClick={onLaunchTour} data-tour-id="tour__launch-tour-btn">
          Launch Tour
        </button>
      </header>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/research" component={Research} />
          <Route exact path="/about" component={About} />
          <Route exact path="/play" component={ClickMeIfYouCan} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      {showTour && (
        <Tour
          tourData={mockData}
          onDismiss={onDismissTour}
          onComplete={onCompleteTour}
        />
      )}
      {/* <Modal
        arrow={{
          direction: modalDirection,
          targetElementDataTourId: "next-tranisition-button"
        }}
        title="Modal Title"
        body={
          <div>
            <span>
              <strong>{modalDirection}</strong>{" "}
            </span>
            <button onClick={nextModalDirection}>Next</button>
          </div>
        }
        footer="Modal Footer"
      /> */}
      {/* <div
        style={{
          width: "600px",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black"
        }}
      >
        <button
          data-tour-id="next-tranisition-button"
          onClick={nextModalDirection}
          style={{
            padding: "15px"
          }}
        >
          I'm Surrounded
        </button>
      </div> */}
    </div>
  );
};

export default withRouter(Main);
