import * as React from 'react';
import cls from 'classnames';

import styles from './button.scss';
interface IButtonProps<T> {
  onClick: (v: T) => void;
  item: T;
  isActive: boolean;
}

function Button<T>({
  item,
  onClick,
  isActive,
  children,
}: React.PropsWithChildren<IButtonProps<T>>) {
  const handleClick = () => {
    onClick(item);
  };
  return (
    <button className={cls(styles.button, { [styles.active]: isActive })} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
