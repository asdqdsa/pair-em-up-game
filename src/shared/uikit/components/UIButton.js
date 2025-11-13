import { createElement } from '@/shared/dom/create-element';

export function UIButton({
  key = '',
  id = null,
  title = '',
  className = '',
  onClick = () => {},
  children = '',
}) {
  const el = createElement(
    'button',
    {
      'data-key': key,
      id,
      className: `${className}`,
      title,
      onClick,
    },
    children
  );

  return el;
}
