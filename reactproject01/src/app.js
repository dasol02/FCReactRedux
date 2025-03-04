/* @jsx createElement */

import { render, createElement } from "./react.js";

// const vdom = createElement(
//   "P",
//   {},
//   createElement("h1", {}, "React 만들기"),
//   createElement(
//     "ul",
//     {},
//     createElement("li", { style: "color:red" }, "첫 번째 아이템"),
//     createElement("li", { style: "color:blue" }, "두 번째 아이템"),
//     createElement("li", { style: "color:green" }, "세 번째 아이템")
//   )
// );

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>;
}

const vdom = (
  <p>
    <Title label="React">React 정말 잘 만들기</Title>
    <ul>
      <Item color="red">첫 번째 아이템</Item>
      <Item color="blue">두 번째 아이템</Item>
      <Item color="green">세 번째 아이템</Item>
    </ul>
  </p>
);

console.log(vdom);
render(vdom, document.querySelector("#root"));
