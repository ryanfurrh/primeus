"use Client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(4);
  function decrementCount() {
    setCount((prevCount) => prevCount - 1);
  }
  function incrementCount() {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div className="flex justify-center w-full gap-2 pt-4 select-none place-content-center">
      <button
        onClick={decrementCount}
        className="flex items-center self-center w-5 h-5 border-1 place-content-center border-sand-600"
      >
        -
      </button>
      <h1 className="text-2xl">{count}</h1>
      <button
        onClick={incrementCount}
        className="flex items-center self-center w-5 h-5 border-1 select place-content-center border-sand-600"
      >
        +
      </button>
    </div>
  );
}
