import React from "react";
import { sayHello } from "../lib/action";

const ActionPage = () => {
  return (
    <div>
      <form action={sayHello}>
        <button>Save to Db</button>
      </form>
    </div>
  );
};

export default ActionPage;
