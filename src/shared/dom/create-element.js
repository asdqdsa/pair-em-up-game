export function createElement(type, props = {}, ...children) {
  if (typeof type === 'function') {
    return type(props);
  }

  if (typeof type !== 'string' && typeof type !== 'number') {
    throw new Error('This node type is not supported');
  }

  const el = document.createElement(String(type));

  for (const [attribue, value] of Object.entries(props)) {
    if (attribue.startsWith('on') && typeof value === 'function') {
      el.addEventListener(attribue.slice(2).toLowerCase(), value);
    } else if (attribue === 'className') {
      el.setAttribute('class', value);
    } else {
      el.setAttribute(attribue, value);
    }
  }

  for (const child of children.flat(Infinity)) {
    const isRenderable = child != null && child !== false && child !== true;
    if (isRenderable) {
      if (child instanceof Node) el.append(child);
      else el.append(document.createTextNode(String(child)));
    }
  }

  return el;
}
