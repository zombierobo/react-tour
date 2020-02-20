import React, { useState, useCallback } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TourStep } from "./tour-step";
import { BeforeStartAction, TourData } from "./types";
// import { getTourData } from "./tour-api";

interface TourDataState {
  fetchState: "NOT_STARTED" | "INPROGRESS" | "COMPLETED" | "FAILED";
  data?: TourData;
  errorMessage?: string;
}

interface TourProps {
  tourData: TourData;
  onDismiss: () => void;
  onComplete: () => void;
}

const Tour: React.FC<TourProps & RouteComponentProps> = ({
  tourData,
  onDismiss,
  onComplete,
  history
}) => {
  const { steps } = tourData;
  const [tourState, setTourState] = useState<"NOT_STARTED" | "INPROGRESS">(
    "NOT_STARTED"
  );
  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);

  const doBeforeStartActions = useCallback(
    (actions: BeforeStartAction[]) => {
      actions.forEach(action => {
        if (action.type === "ROUTE_TO") {
          history.push(action.payload.path);
        }
      });
    },
    [history]
  );

  const moveToPreviousStep = useCallback(() => {
    const previousStep = currentStep - 1;
    doBeforeStartActions(steps[previousStep].beforeStartActions || []);
    setCurrentStep(previousStep);
  }, [doBeforeStartActions, currentStep, steps]);

  const moveToNextStep = useCallback(() => {
    const nextStep = currentStep === undefined ? 0 : currentStep + 1;
    doBeforeStartActions(steps[nextStep].beforeStartActions || []);
    setCurrentStep(nextStep);
  }, [doBeforeStartActions, currentStep, steps]);

  const onStart = useCallback(() => {
    setTourState("INPROGRESS");
    moveToNextStep();
  }, [moveToNextStep]);

  return (
    <>
      {tourState === "NOT_STARTED" ? (
        <TourStep
          closable={true}
          title={tourData.title}
          body={<div>{tourData.description}</div>}
          onClose={onDismiss}
          footer={
            <div>
              <button onClick={onDismiss}>DISMISS</button>
              <button onClick={onStart}>START</button>
            </div>
          }
        />
      ) : (
        <TourStep
          closable={true}
          onClose={onDismiss}
          title={tourData.steps[currentStep].title}
          body={<div>{tourData.steps[currentStep].description}</div>}
          arrow={tourData.steps[currentStep].arrow}
          footer={
            <div>
              {currentStep > 0 && (
                <button onClick={moveToPreviousStep}>PREVIOUS</button>
              )}
              {currentStep < tourData.steps.length - 1 && (
                <button onClick={moveToNextStep}>NEXT</button>
              )}
              {currentStep === tourData.steps.length - 1 && (
                <button onClick={onComplete}>DONE</button>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

// const Tour: React.FC = () => {

//   const [tourDataState, setTourDataState] = useState<TourDataState>({
//     fetchState: "NOT_STARTED"
//   });

//   useEffect(() => {
//     setTourDataState({
//       fetchState: "INPROGRESS"
//     });
//     getTourData().then(
//       tourData =>
//         setTourDataState({
//           fetchState: "COMPLETED",
//           data: tourData
//         }),
//       error =>
//         setTourDataState({
//           fetchState: "FAILED",
//           errorMessage:
//             "Ooops!! Something went wrong. Please check your network connection and try again"
//         })
//     );
//   }, []);

//   return <>
//     {
//       tourDataState.fetchState === 'COMPLETED' && tourDataState.data ?
//         <TourController tourData={tourDataState.data} /> : 'Spinner'
//     }
//   </>;
// };

export default withRouter(Tour);
