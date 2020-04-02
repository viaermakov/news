import * as React from "react";
import { useLocation } from "react-router-dom";
import { observer, useLocalStore } from "mobx-react";

import { getQuery } from "src/getQuery";
import { Filters } from "components/filters";

import styles from "./main.scss";

import { useStore } from 'src/mobx';

import { Articles } from "src/components/articles";


interface IMainContainerProps {}

const Main: React.FC<IMainContainerProps> = observer(({}) => {
  const location = useLocation();
  const query = getQuery(location);
  const { articles: articlesStore } = useStore();

  const articles = articlesStore.getSortedArticles(query);

  const store = useLocalStore(() => ({
    title: "Test"
  }));

  React.useEffect(() => {
    articlesStore.getArticles();
  }, []);

  const handleClick = () => {
    store.title = "adasdsd";
  };
  return (
    <div className={styles.layout} onClick={handleClick}>
      {store.title}
      <Filters />
      <Articles articles={articles} isLoading={articlesStore.isLoading} />
    </div>
  );
});

export default Main;
