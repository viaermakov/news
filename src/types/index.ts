import { ArticleModel } from 'src/store/headlines';
import { Instance } from 'mobx-state-tree';

export type IArticle = Instance<typeof ArticleModel>;

export type ICategory =
  | 'business'
  | 'sports'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'technology';

export interface IIconProps {
  w?: number;
  h?: number;
  className?: string;
  onClick?: () => void;
}
