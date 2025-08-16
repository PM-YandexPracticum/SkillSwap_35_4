type LogoType = 'icon' | 'title';

export type LogoUIProps = {
  variant?: LogoType;
  size?: number;
  alt?: string;
  className?: string;
  onClick?: React.HTMLAttributes<HTMLImageElement>['onClick'];
};
