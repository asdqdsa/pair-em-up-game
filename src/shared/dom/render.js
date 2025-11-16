export function render(node, root) {
  const el = typeof node === 'function' ? node() : node;
  root.replaceChildren(el);
  return el;
}

export function mount(node, root) {
  const el = typeof node === 'function' ? node() : node;
  root.append(el);
  return el;
}

export function unmount(root) {
  root.replaceChildren();
}

export function rerender({ root, nodeFn: node, props = {} }) {
  const el = node(props);
  root.replaceChildren(el);
  return el;
}
