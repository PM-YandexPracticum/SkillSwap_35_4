import React from 'react';
import { RadioGroup } from '../shared/ui/radiogroup/RadioGroup';
import type { RadioOption } from '../shared/ui/radiogroup/type';
import './RadioGroup.css';

interface RadioGroupDemoProps {
  title?: string;
  options: RadioOption[];
}

const getUniqueId = () => `radio-${Math.random().toString(36).substr(2, 9)}`;

export const RadioGroupDemo: React.FC<RadioGroupDemoProps> = ({
  title = 'Radio Group Demo',
  options,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(options[0]?.value);
  const [name] = React.useState(getUniqueId());

  return (
    <div className="story-container">
      <h3 className="story-title">{title}</h3>
      <RadioGroup
        options={options}
        selectedValue={selectedValue}
        onChange={setSelectedValue}
        name={name}
      />
    </div>
  );
};
