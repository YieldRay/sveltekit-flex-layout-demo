type CSD = Partial<CSSStyleDeclaration>;
type CssPropOptions = {
    [cssProp in keyof CSD]: Array<CSD[keyof CSD]>;
};

export const flex: CssPropOptions = {
    alignItems: [
        "normal",
        "stretch",
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "self-start",
        "self-end",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
    alignContent: [
        "stretch",
        "center",
        "flex-start",
        "flex-end",
        "baseline",
        "normal",
        "first baseline",
        "last baseline",
        "start",
        "end",
        "self-start",
        "self-end",
        "safe center",
        "unsafe center",
        "inherit",
        "initial",
        "unset",
    ],
    justifyContent: [
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "left",
        "right",
        "normal",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "safe center",
        "unsafe center",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
    justifyItems: [
        "normal",
        "stretch",
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "self-start",
        "self-end",
        "left",
        "right",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "legacy right",
        "legacy left",
        "legacy center",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
    flexDirection: [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
    flexWrap: ["nowrap", "wrap", "wrap-reverse", "inherit", "initial", "revert", "revert-layer", "unset"],
};

export const self: CssPropOptions = {
    alignSelf: [
        "auto",
        "normal",
        "stretch",
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "self-start",
        "self-end",
        "left",
        "right",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
    justifySelf: [
        "auto",
        "normal",
        "stretch",
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "self-start",
        "self-end",
        "left",
        "right",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
    ],
};

export function camelToKebab(camelString: string) {
    return camelString.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function styleObjToText(styleObj: Partial<CSSStyleDeclaration>) {
    return Object.entries(styleObj)
        .map(([k, v]) => (v ? `${camelToKebab(k)}: ${v};` : ""))
        .join("");
}
