export function createDOM(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  console.log("node.props:", node.props);

  //   const props = node.props || {};
  Object.entries(node.props).forEach(([name, value]) =>
    element.setAttribute(name, value)
  );

  node.children.map(createDOM).forEach(element.appendChild.bind(element));

  return element;
}

export function createElement(tag, props, ...children) {
  props = props || {};

  return { tag, props, children };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
