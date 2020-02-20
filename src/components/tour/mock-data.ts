import { TourData } from "./types";

export const mockData: TourData = {
  title: "Getting Started",
  description:
    "There are tons of features in our app. Just take a moment to check out all the possibilites, We are sure that you won't be dissapointed.",
  steps: [
    {
      title: "Home page",
      description: "There is something on this page that is useful",
      arrow: {
        direction: "bottom-right",
        targetElementDataTourId: "tour__nav-link__home"
      },
      beforeStartActions: [
        {
          type: "ROUTE_TO",
          payload: {
            path: "/"
          }
        }
      ]
    },
    {
      title: "Research page",
      description:
        "This page contents information about prominent researchers and cutting edge research work",
      arrow: {
        direction: "bottom-right",
        targetElementDataTourId: "tour__nav-link__research"
      },
      beforeStartActions: [
        {
          type: "ROUTE_TO",
          payload: {
            path: "/research"
          }
        }
      ]
    },
    {
      title: "Play page",
      description:
        "Bored already ?!? Then here is a game to wake you up from your lethargic instincts",
      arrow: {
        direction: "bottom-right",
        targetElementDataTourId: "tour__nav-link__play"
      },
      beforeStartActions: [
        {
          type: "ROUTE_TO",
          payload: {
            path: "/play"
          }
        }
      ]
    },
    {
      title: "About page",
      description:
        "Meta page which is used to describe the purpose of this website",
      arrow: {
        direction: "bottom-right",
        targetElementDataTourId: "tour__nav-link__about"
      },
      beforeStartActions: [
        {
          type: "ROUTE_TO",
          payload: {
            path: "/about"
          }
        }
      ]
    },
    {
      title: "End of Tour",
      description:
        "That's all for now. You can launch this guided tour anytime by clicking this button",
      arrow: {
        direction: "bottom-left",
        targetElementDataTourId: "tour__launch-tour-btn"
      },
      beforeStartActions: []
    }
  ]
};
