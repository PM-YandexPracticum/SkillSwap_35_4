import React from 'react';

import logoUrl from '../../../assets/icons/skillsTypes/logo.svg?url';
import titleUrl from '../../../assets/icons/skillsTypes/SkillSwap.svg?url';
import type { LogoUIProps } from './type';

const LogoUI: React.FC<LogoUIProps> = ({
  variant = 'icon',
  size = 40,
  alt = 'SkillSwap',
  className,
  onClick,
}) => {
  const src = variant === 'icon' ? logoUrl : titleUrl;

  return (
    <img
      src={src}
      alt={alt}
      height={size}
      className={className}
      onClick={onClick}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
};

export default LogoUI;
