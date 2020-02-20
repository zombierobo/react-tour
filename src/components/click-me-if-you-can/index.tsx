import React, { useState } from "react";
import UnClickableButton from "./UnClickableButton";

const ClickMeIfYouCan: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <h3>Click me if you can</h3>
      <p>Try to click the button. There is a surprise if you do succeed</p>
      {!clicked ? (
        <UnClickableButton onSuccess={() => setClicked(true)} />
      ) : (
        <div>
          <p>
            You did it!!! Here's a{" "}
            <span role="img" aria-label="cokkie">
              🍪
            </span>{" "}
            for you
          </p>
          <button onClick={() => setClicked(false)}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default ClickMeIfYouCan;
