import { createElement } from '@/shared/dom/create-element';

export function ModalUI({ children, className = '', onClose = () => {} }) {
  const el = createElement(
    'div',
    { className: `modal ${className}` },
    createElement('div', { className: 'modal__backdrop', onClick: onClose }),
    createElement('div', { className: 'modal__content' }, children)
  );

  return el;
}
