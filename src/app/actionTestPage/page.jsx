import React from "react";
import { sayHello } from "../lib/action";

const ActionPage = () => {
  return (
    <div>
      <form action={sayHello}>
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="desc" placeholder="desc" />
        <input type="text" name="userId" placeholder="userId" />
        <input type="text" name="slug" placeholder="slug" />
        <button>Save to Db</button>
      </form>
    </div>
  );
};

export default ActionPage;
