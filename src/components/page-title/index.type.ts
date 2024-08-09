export enum PageTitleVariant {
  Default = "default",
  WhiteBeforeLg = "whiteBeforeLg",
}

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  variant?: PageTitleVariant;
}
