import * as React from 'react';
import cls from 'classnames';

import { Button } from 'components/button';

import styles from './tabs.scss';

interface ITabsProps<T> {
  className: string;
  onClick: (v: T) => void;
  options: T[];
  value: string;
}

interface IOption {
  id: number;
  label: string;
  value: string;
}

function Tabs<T extends IOption>({ className, options, onClick, value }: ITabsProps<T>) {
  return (
    <div className={cls(className, styles.tabs)}>
      {options.map(option => {
        return (
          <Button<T>
            key={option.id}
            item={option}
            onClick={onClick}
            isActive={option.value === value}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

export default Tabs;
