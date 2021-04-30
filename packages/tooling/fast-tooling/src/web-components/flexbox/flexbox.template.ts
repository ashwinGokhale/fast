import { html, repeat } from "@microsoft/fast-element";
import { Flexbox } from "./flexbox";

/**
 * The template for the flexbox component.
 * @public
 */
export const FlexboxTemplate = html<Flexbox>`
    <template>
        <div class="root">
            <div class="control-region">
                <fast-switch @change="${(x, c) => x.handleToggleFlexbox()}">
                    Enable Flexbox
                </fast-switch>
            </div>
            <div class="flexbox-controls${x => (x.flexEnabled ? ` active` : "")}">
                <div class="control-region">
                    <label for="fast-tooling-css-flex-direction">Direction</label>
                    <fast-select
                        id="fast-tooling-css-flex-direction"
                        @change="${(x, c) =>
                            x.handleCSSChange("flexDirectionValue", c.event)}"
                    >
                        ${repeat(
                            x => x.flexDirectionOptions,
                            html<string, Flexbox>`
                                <fast-option
                                    value="${x => x}"
                                    ?selected="${(x, c) =>
                                        c.parent.flexDirectionValue === x}"
                                >
                                    ${x => x}
                                </fast-option>
                            `
                        )}
                    </fast-select>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-justify-content">Justify Content</label>
                    <fast-select
                        id="fast-tooling-css-justify-content"
                        @change="${(x, c) =>
                            x.handleCSSChange("justifyContentValue", c.event)}"
                    >
                        ${repeat(
                            x => x.justifyContentOptions,
                            html<string>`
                                <fast-option value="${x => x}">${x => x}</fast-option>
                            `
                        )}
                    </fast-select>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-justify-items">Justify Items</label>
                    <fast-select
                        id="fast-tooling-css-justify-items"
                        @change="${(x, c) =>
                            x.handleCSSChange("justifyItemsValue", c.event)}"
                    >
                        ${repeat(
                            x => x.justifyItemsOptions,
                            html<string>`
                                <fast-option value="${x => x}">${x => x}</fast-option>
                            `
                        )}
                    </fast-select>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-align-content">Align Content</label>
                    <fast-select
                        id="fast-tooling-css-align-content"
                        @change="${(x, c) =>
                            x.handleCSSChange("alignContentValue", c.event)}"
                    >
                        ${repeat(
                            x => x.alignContentOptions,
                            html<string>`
                                <fast-option value="${x => x}">${x => x}</fast-option>
                            `
                        )}
                    </fast-select>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-align-items">Align Items</label>
                    <fast-select
                        id="fast-tooling-css-align-items"
                        @change="${(x, c) =>
                            x.handleCSSChange("alignItemsValue", c.event)}"
                    >
                        ${repeat(
                            x => x.alignItemsOptions,
                            html<string>`
                                <fast-option value="${x => x}">${x => x}</fast-option>
                            `
                        )}
                    </fast-select>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-gap">Gap</label>
                    <fast-number-field
                        class="css-gap"
                        id="fast-tooling-css-gap"
                        @input="${(x, c) => x.handleCSSChange("gapValue", c.event)}"
                    ></fast-number-field>
                    <span class="css-gap">px</span>
                </div>
                <div class="control-region">
                    <label for="fast-tooling-css-flex-wrap">Wrap</label>
                    <fast-select
                        id="fast-tooling-css-flex-wrap"
                        @change="${(x, c) => x.handleCSSChange("flexWrapValue", c.event)}"
                    >
                        ${repeat(
                            x => x.flexWrapOptions,
                            html<string>`
                                <fast-option value="${x => x}">${x => x}</fast-option>
                            `
                        )}
                    </fast-select>
                </div>
            </div>
        </div>
    </template>
`;
