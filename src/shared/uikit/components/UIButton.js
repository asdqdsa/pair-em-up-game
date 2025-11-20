import { createElement } from '@/shared/dom/create-element';

export function UIButton({
  key = '',
  id = null,
  title = '',
  className = '',
  onClick = null,
  children = '',
  disabled = false,
}) {
  const props = {
    'data-key': key,
    id,
    className: `${className}`,
    title,
  };

  if (!disabled && typeof onClick === 'function') {
    props.onClick = onClick;
  }

  if (disabled) {
    props.disabled = true;
  }

  const el = createElement('button', props, children);

  return el;
}
