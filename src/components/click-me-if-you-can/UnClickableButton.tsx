import React from "react";

const UnClickableButton: React.FC<{ onSuccess: () => void }> = ({
  onSuccess
}) => {
  return (
    <div>
      <button onClick={() => onSuccess()}>Click Me!!</button>
    </div>
  );
};

export default UnClickableButton;
