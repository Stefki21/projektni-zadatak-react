import { useState } from "react";

function useInput(validation, defaultInputValue='') {
  const [item, setItem] = useState(defaultInputValue);
  const [itemHasError, setItemHasError] = useState(false);

  const itemValid = validation(item);

  function inputChangeHandler(event) {
    const inputValue = event.target.value;
    setItem(inputValue);
    if (validation(inputValue)) {
      setItemHasError(false);
    }
  }

  function blurChangeHandler(event) {
    if (!itemValid) {
      setItemHasError(true);
    }
  }

  return {
    item,
    itemValid,
    itemHasError,
    inputChangeHandler,
    blurChangeHandler,
  };
}

export default useInput;