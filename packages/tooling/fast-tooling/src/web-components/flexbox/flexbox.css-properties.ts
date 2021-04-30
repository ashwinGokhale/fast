export type FlexboxCSSPropertyName =
    | "flex-wrap"
    | "align-items"
    | "align-content"
    | "flex-direction"
    | "justify-items"
    | "justify-content"
    | "gap";

export type ObservableFlexboxCSSPropertyName =
    | "flexDirectionValue"
    | "justifyContentValue"
    | "justifyItemsValue"
    | "alignContentValue"
    | "alignItemsValue"
    | "flexWrapValue"
    | "gapValue";

export type FlexboxSpacing = "space-between" | "space-around" | "space-evenly";

export type FlexboxPositioning = "flex-start" | "flex-end" | "center" | "stretch";

export type FlexboxWrap = "nowrap" | "wrap" | "wrap-reverse";

export type FlexboxOrientation = "row" | "row-reverse" | "column" | "column-reverse";

export const flexboxCssProperties: Array<FlexboxCSSPropertyName> = [
    "flex-wrap",
    "align-items",
    "align-content",
    "flex-direction",
    "justify-items",
    "justify-content",
    "gap",
];

export type FlexDirection = FlexboxOrientation | "";

export const flexDirectionOptions: Array<FlexDirection> = [
    "",
    "row",
    "row-reverse",
    "column",
    "column-reverse",
];

export type JustifyContent = FlexboxSpacing | FlexboxPositioning | "";

export const justifyContentOptions: Array<JustifyContent> = [
    "",
    "flex-start",
    "flex-end",
    "center",
    "stretch",
    "space-between",
    "space-around",
    "space-evenly",
];

export type JustifyItems = FlexboxPositioning | "";

export const justifyItemsOptions: Array<JustifyItems> = [
    "",
    "flex-start",
    "flex-end",
    "center",
    "stretch",
];

export type AlignContent = JustifyContent;

export const alignContentOptions: Array<AlignContent> = justifyContentOptions;

export type AlignItems = JustifyItems;

export const alignItemsOptions: Array<AlignItems> = justifyItemsOptions;

export type FlexWrap = FlexboxWrap | "";

export const flexWrapOptions: Array<FlexWrap> = ["", "nowrap", "wrap", "wrap-reverse"];
