export interface BeforeStartAction<T = any> {
  type: "ROUTE_TO";
  payload: T;
}

type ArrowDirection =
  | "left"
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left";

export interface TourData {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    required?: boolean;
    arrow?: {
      direction: ArrowDirection;
      targetElementDataTourId: string;
    };
    beforeStartActions: BeforeStartAction[];
  }>;
}
