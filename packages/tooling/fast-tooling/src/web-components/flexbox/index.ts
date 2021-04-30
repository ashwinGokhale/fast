import { customElement } from "@microsoft/fast-element";
import { FlexboxTemplate as template } from "./flexbox.template";
import { flexboxStyles as styles } from "./flexbox.styles";
import { Flexbox } from "./flexbox";

/**
 * The FAST Tooling Flexbox Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tooling-flexbox\>
 */
@customElement({
    name: "fast-tooling-flexbox",
    template,
    styles,
})
export class FASTToolingFlexbox extends Flexbox {
    /**
     * @internal
     */
    public connectedCallback() {
        super.connectedCallback();
    }
}
export { flexboxCssProperties } from "./flexbox.css-properties";
