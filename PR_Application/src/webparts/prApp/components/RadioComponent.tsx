import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

const RadioComponent = () => {
  const options: IChoiceGroupOption[] = [
    { key: 'm', text: 'male' },
    { key: 'f', text: 'female' },
  ];

  const onChange = (
    ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    console.dir(option);
  };

  const choiceGroupStyles = {
    label: {
      display: 'inline',
    },
    flexContainer: {
      columnGap: '1em',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  };

  return (
    <>
      <ChoiceGroup options={options} onChange={onChange} required={true} styles={choiceGroupStyles} />
    </>
  );
};

export default RadioComponent;
