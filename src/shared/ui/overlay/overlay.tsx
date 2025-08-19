import style from './overlay.module.css';

export const Overlay = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={`${style.overlay}`} onClick={onClick} role="presentation" />
  );
};

export default Overlay;
