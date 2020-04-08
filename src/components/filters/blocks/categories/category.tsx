import * as React from 'react';
import styles from './category.scss';
import { ICategory } from 'src/types';

export interface ICategoryItem {
  id: number;
  label: ICategory;
}

interface Props {
  category: ICategoryItem;
  onClick: (v: ICategoryItem) => void;
}

const Category: React.FC<Props> = ({ category, onClick }) => {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <span className={styles.category} onClick={handleClick} key={category.id}>
      {category.label}
    </span>
  );
};

export default Category;
