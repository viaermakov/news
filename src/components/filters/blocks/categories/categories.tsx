import * as React from "react";
import styles from "./categories.scss";

import Category, { ICategoryItem } from "./category";
import { ICategory } from "src/types";

interface Props {
  onClick: (v: ICategory) => void;
}

const CATEGORIES: ICategoryItem[] = [
  { id: 0, label: "business" },
  { id: 1, label: "sports" },
  { id: 2, label: "entertainment" },
  { id: 3, label: "general" },
  { id: 4, label: "health" },
  { id: 5, label: "science" },
  { id: 6, label: "technology" }
];

const Categories: React.FC<Props> = ({ onClick }) => {
  const handleClick = React.useCallback((category: ICategoryItem) => {
    onClick(category.label);
  }, [onClick]);

  return (
    <div className={styles.filters}>
      <div className={styles.tabs}>
        {CATEGORIES.map(category => {
          return <Category key={category.id} category={category} onClick={handleClick} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
