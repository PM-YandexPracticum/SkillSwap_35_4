export type TitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'caption';
export type TitleColor = 'primary' | 'secondary' | 'accent' | 'error';

export interface TitleProps {
  /** HTML тег для семантики */
  as?: TitleVariant;
  /** Вариант цвета текста */
  color?: TitleColor;
  /** Дополнительные классы */
  className?: string;
  /** Дочерние элементы */
  children?: React.ReactNode;
  /** Выравнивание текста */
  align?: 'left' | 'center' | 'right';
  /** Начертание шрифта */
  weight?: 'regular' | 'medium' | 'semibold';
}
