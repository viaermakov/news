import * as React from 'react';
import { IIconProps } from 'src/types';

const TileIcon: React.FC<IIconProps> = ({ w = 20, h = 20, className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width={w}
      height={h}
      enableBackground="new 0 0 405.333 405.333"
      version="1.1"
      viewBox="0 0 405.333 405.333"
      xmlSpace="preserve"
    >
      <path d="M0 0v170.667h170.667V0H0zm128 128H42.667V42.667H128V128zM234.667 0v170.667h170.667V0H234.667zm128 128h-85.333V42.667h85.333V128zM0 234.667v170.667h170.667V234.667H0zm128 128H42.667v-85.333H128v85.333zM234.667 234.667v170.667h170.667V234.667H234.667zm128 128h-85.333v-85.333h85.333v85.333z"></path>
    </svg>
  );
};

export default TileIcon;
