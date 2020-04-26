import { Instance } from 'mobx-state-tree';
import { ArticleModel } from 'src/store/headlines';
import { SourceModel } from 'src/store/sources';

export type IArticle = Instance<typeof ArticleModel>;
export type ISource = Instance<typeof SourceModel>;

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
