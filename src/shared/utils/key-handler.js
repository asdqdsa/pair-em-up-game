export const setKeyHandler = ({
  key = 'Escape',
  type = 'keydown',
  onKey = () => {},
}) => {
  const handler = (evt) => evt.key === key && onKey();

  return {
    mount: () => document.addEventListener(type, handler),
    unmount: () => document.removeEventListener(type, handler),
  };
};
