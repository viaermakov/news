import * as React from 'react';

export interface ICallbackObject {
  value: string;
}

interface INoResultsProps {
  onClick: () => void;
  className?: string;
}

const NoResults: React.SFC<INoResultsProps> = ({ className, onClick, children }) => {
  console.log('object');
  return <div onClick={onClick}>Empty results </div>;
};

export default NoResults;
