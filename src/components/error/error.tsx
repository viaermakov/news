import * as React from "react";
import cls from "classnames";

import styles from "./error.scss";

export interface ICallbackObject {
  value: string;
}

interface IInputProps {
  error: string;
  className?: string;
}

const ErrorWrapper: React.SFC<IInputProps> = ({
  className,
  error,
  children
}) => {
  if (error) {
    return <div>{error}</div>;
  }
  return <>{children}</>;
};

export default ErrorWrapper;
