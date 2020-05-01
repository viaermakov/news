import * as React from 'react';
// import cls from "classnames";

import { ISource } from 'src/types';

import styles from './source.scss';

interface ISourceComponentProps {
  source: ISource;
  isFavourite: boolean;
  onAddFavourite?: (id: number) => void;
}

const Source: React.FC<ISourceComponentProps> = ({ source }) => (
  <div key={source.url} className={styles.source}>
    <div className={styles.name}>{source.name}</div>
    <div className={styles.phrase}>{source.description}</div>
  </div>
);

export default Source;
