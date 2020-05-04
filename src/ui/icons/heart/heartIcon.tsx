import * as React from 'react';
import cls from 'classnames';

import { IIconProps } from './node_modules/src/types';

import styles from './heartIcon.scss';

interface IHeartProps extends IIconProps {
  active: boolean;
}
const HeartIcon: React.FC<IHeartProps> = ({ w = 24, h = 24, className, onClick, active }) => {
  return (
    <svg width={w} height={h} className={className} onClick={onClick} viewBox="0 0 24 24">
      <path
        className={cls(styles.heart, { [styles.active]: active })}
        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
      ></path>
    </svg>
  );
};

export default HeartIcon;
