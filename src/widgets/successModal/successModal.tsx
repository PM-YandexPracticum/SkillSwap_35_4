import { ModalUI } from '../../shared/ui/ModalUI';
import type { SuccessModalProps } from './types';
import style from './successModal.module.scss';
import { Title } from '../../shared/ui/title';
import { Button } from '../../shared/ui/button';
import successIcon from '../../shared/assets/icons/success.svg?url';

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <ModalUI openModal={true} onClose={onClose}>
      <div className={style.modalContent}>
        <img className={style.modalImage} src={successIcon} alt="Success" />
        <Title as="h2">Ваше предложение создано</Title>
        <p className={style.modalDescription}>Теперь вы можете предложить обмен</p>
        <Button className={style.modalButton} onClick={onClose}>Готово</Button>
      </div>
    </ModalUI>
  );
};
