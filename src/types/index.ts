import { ArticleModel } from "src/mobx/model";
import { Instance } from "mobx-state-tree";

export interface IArticle extends Instance<typeof ArticleModel> {}

export type ICategory =
  | "business"
  | "sports"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "technology";

export interface IIconProps {
  w?: number;
  h?: number;
  className?: string;
  onClick?: () => void;
}
