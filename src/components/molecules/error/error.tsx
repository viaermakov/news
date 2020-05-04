import * as React from 'react';

export interface ICallbackObject {
  value: string;
}

interface IInputProps {
  error: string;
  className?: string;
}

const ErrorWrapper: React.SFC<IInputProps> = ({ className, error, children }) => {
  if (error) {
    return <div>{error}</div>;
  }
  return <>{children}</>;
};

export default ErrorWrapper;
