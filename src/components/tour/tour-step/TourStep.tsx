import React, { useRef, useEffect } from "react";
import { getViewportDimensions } from "../../../utils/view-port-dimensions";
import "./styles.css";

export type ArrowDirection =
  | "left"
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left";

interface TourStepProps {
  arrow?: {
    direction:
      | "left"
      | "top-left"
      | "top"
      | "top-right"
      | "right"
      | "bottom-right"
      | "bottom"
      | "bottom-left";
    targetElementDataTourId: string;
  };
  title?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const getDOMElementGeometricProps = (
  element: HTMLElement
): {
  top: number;
  left: number;
  width: number;
  height: number;
} => {
  const box = element.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

const getTourStepContentStyle = (
  tourStep: {
    height: number;
    width: number;
  },
  viewPort: {
    height: number;
    width: number;
  },
  direction: ArrowDirection,
  target: {
    top: number;
    left: number;
    width: number;
    height: number;
  }
) => {
  switch (direction) {
    case "left":
      return {
        top: `${target.top + target.height / 2 - tourStep.height / 2}px`,
        right: `${viewPort.width - target.left}px`
      };
    case "top-left":
      return {
        bottom: `${target.top}px`,
        right: `${viewPort.width - target.left}px`
      };
    case "top":
      return {
        bottom: `${target.top}px`,
        left: `${target.left + target.width / 2 - tourStep.width / 2}px`
      };
    case "top-right":
      return {
        bottom: `${target.top}px`,
        left: `${target.left + target.width}px`
      };
    case "right":
      return {
        top: `${target.top + target.height / 2 - tourStep.height / 2}px`,
        left: `${target.left + target.width}px`
      };
    case "bottom-right":
      return {
        top: `${target.top + target.height}px`,
        left: `${target.left + target.width}px`
      };
    case "bottom":
      return {
        top: `${target.top + target.height}px`,
        left: `${target.left + target.width / 2 - tourStep.width / 2}px`
      };
    case "bottom-left":
      return {
        top: `${target.top + target.height}px`,
        right: `${viewPort.width - target.left}px`
      };
  }
};

const applyStylesToHtmlElement = (element: HTMLElement, style: {}) =>
  Object.keys(style).map(key => (element.style[key] = style[key]));

const TourStep: React.SFC<TourStepProps> = ({
  arrow,
  title,
  body,
  footer,
  closable,
  onClose
}) => {
  const tourStepContentRef = useRef<HTMLDivElement>();
  const highlightElementStageRef = useRef<HTMLDivElement>();
  const previousTarget = useRef<{
    element: HTMLElement;
    savedStyles: {};
  }>();

  useEffect(() => {
    if (arrow) {
      if (tourStepContentRef.current && highlightElementStageRef.current) {
        const { direction, targetElementDataTourId } = arrow;
        const targetElement = document.querySelector(
          `[data-tour-id="${targetElementDataTourId}"]`
        ) as HTMLElement;
        const target = getDOMElementGeometricProps(targetElement);
        applyStylesToHtmlElement(tourStepContentRef.current, {
          left: "",
          right: "",
          top: "",
          bottom: "",
          transform: "none",
          ...getTourStepContentStyle(
            getDOMElementGeometricProps(tourStepContentRef.current),
            getViewportDimensions(),
            direction,
            target
          )
        });
        applyStylesToHtmlElement(highlightElementStageRef.current, {
          position: "absolute",
          "z-index": "3",
          "background-color": "#fff",
          width: `${target.width}px`,
          height: `${target.height}px`,
          top: `${target.top}px`,
          left: `${target.left}px`
        });
        previousTarget.current = {
          element: targetElement,
          savedStyles: {
            "z-index": targetElement.style["z-index"],
            position: targetElement.style["position"]
          }
        };
        targetElement.style["z-index"] = "4";
        targetElement.style["position"] = "relative";
      }
    } else {
      if (tourStepContentRef.current) {
        applyStylesToHtmlElement(tourStepContentRef.current, {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        });
      }
    }
    return () => {
      // clean up step - restore style of highlighted element
      if (previousTarget.current) {
        applyStylesToHtmlElement(
          previousTarget.current.element,
          previousTarget.current.savedStyles
        );
      }
    };
  }, [arrow]);

  return (
    <div className="tour-step">
      <div className="tour-step__content" ref={tourStepContentRef}>
        <div className="tour-step__title__wrapper">
          {title && (
            <div className="tour-step__title__wrapper__content">{title}</div>
          )}
          {closable && (
            <button
              className="tour-step__title__wrapper__close-btn"
              onClick={onClose}
            >
              X
            </button>
          )}
        </div>
        <div className="tour-step__body__wrapper">
          {body && (
            <div className="tour-step__body__wrapper__content">{body}</div>
          )}
        </div>
        <div className="tour-step__footer__wrapper">
          {footer && (
            <div className="tour-step__footer__wrapper__content">{footer}</div>
          )}
        </div>
      </div>
      <div className="tour-step__backdrop" />
      <div ref={highlightElementStageRef} />
    </div>
  );
};

export default TourStep;
