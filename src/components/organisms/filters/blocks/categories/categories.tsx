import * as React from 'react';

import Category from './category/category';
import { ICategoryItem } from './types';

import styles from './categories.scss';
import cls from 'classnames';

interface Props {
  onClick: (v: string) => void;
  categories: ICategoryItem[];
  className?: string;
}

function Categories(props: Props): JSX.Element {
  const { onClick, categories, className } = props;

  const handleClick = React.useCallback(
    (category: ICategoryItem) => {
      onClick(category.label);
    },
    [onClick],
  );

  return (
    <div className={cls(className, styles.filters)}>
      <div className={styles.tabs}>
        {categories.map((category: ICategoryItem) => (
          <Category key={category.id} category={category} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
