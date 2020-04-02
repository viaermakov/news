import { Article } from "./../mobx/model";
import { Instance } from "mobx-state-tree";

export interface IArticle extends Instance<typeof Article> {}

export interface IIconProps {
  w?: number;
  h?: number;
  className?: string;
  onClick?: () => void;
}

