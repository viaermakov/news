import * as React from 'react';
import { IIconProps } from 'src/types';

const SearchIcon: React.FC<IIconProps> = ({ w = 24, h = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width={w}
      height={h}
      className={className}
      enableBackground="new 0 0 512.005 512.005"
      version="1.1"
      viewBox="0 0 512.005 512.005"
      xmlSpace="preserve"
    >
      <path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"></path>
    </svg>
  );
};

export default SearchIcon;
