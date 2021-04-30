import { observable } from "@microsoft/fast-element";
import {
    FASTNumberField,
    FASTOption,
    FASTSelect,
    FASTSwitch,
} from "@microsoft/fast-components";
import { FormAssociatedFlexbox } from "./flexbox.form-associated";
import {
    alignContentOptions,
    alignItemsOptions,
    FlexboxCSSPropertyName,
    flexDirectionOptions,
    flexWrapOptions,
    justifyContentOptions,
    justifyItemsOptions,
    ObservableFlexboxCSSPropertyName,
} from "./flexbox.css-properties";

// Prevent tree shaking
FASTSwitch;
FASTSelect;
FASTNumberField;
FASTOption;

/**
 * A Flexbox Custom HTML Element.
 *
 * @public
 */
export class Flexbox extends FormAssociatedFlexbox {
    /**
     * When true the flexbox controls are visible
     * @internal
     */
    @observable
    public flexEnabled: boolean = false;

    /**
     * The string options for the flex-direction CSS property
     * @internal
     */
    public flexDirectionOptions: string[] = flexDirectionOptions;

    /**
     * The string options for the justify-content CSS property
     * @internal
     */
    public justifyContentOptions: string[] = justifyContentOptions;

    /**
     * The string options for the justify-items CSS property
     * @internal
     */
    public justifyItemsOptions: string[] = justifyItemsOptions;

    /**
     * The string options for the align-content CSS property
     * @internal
     */
    public alignContentOptions: string[] = alignContentOptions;

    /**
     * The string options for the align-items CSS property
     * @internal
     */
    public alignItemsOptions: string[] = alignItemsOptions;

    /**
     * The string options for the flex-wrap CSS property
     * @internal
     */
    public flexWrapOptions: string[] = flexWrapOptions;

    /**
     * The flex-direction CSS property value
     * @internal
     */
    @observable
    public flexDirectionValue: string = "";

    /**
     * The justify-content CSS property value
     * @internal
     */
    @observable
    public justifyContentValue: string = "";

    /**
     * The justify-items CSS property value
     * @internal
     */
    @observable
    public justifyItemsValue: string = "";

    /**
     * The align-content CSS property value
     * @internal
     */
    @observable
    public alignContentValue: string = "";

    /**
     * The align-items CSS property value
     * @internal
     */
    @observable
    public alignItemsValue: string = "";

    /**
     * The gap CSS property value
     * @internal
     */
    @observable
    public gapValue: string = "";

    /**
     * The flex-wrap CSS property value
     * @internal
     */
    @observable
    public flexWrapValue: string = "";

    /**
     * The change event handler for the flexbox controls
     *
     * @param cssPropertyName The CSS property name
     * @param e The change event object
     * @internal
     */
    public handleCSSChange(
        observablePropertyName: ObservableFlexboxCSSPropertyName,
        e: Event
    ): void {
        const cssPropertyValue = (e.composedPath()[0] as HTMLSelectElement).value;

        if (cssPropertyValue) {
            this[observablePropertyName] = cssPropertyValue;
        } else {
            this[observablePropertyName] = "";
        }

        this.value = this.convertFlexboxValuesToString();

        this.$emit("change");
    }

    /**
     * Handles the flexbox controls being enabled
     * @internal
     */
    public handleToggleFlexbox(): void {
        if (this.flexEnabled) {
            this.resetFlexboxValues();
        }

        this.flexEnabled = !this.flexEnabled;

        this.value = this.convertFlexboxValuesToString();

        this.$emit("change");
    }

    /**
     * Resets the flexbox CSS property values
     * @internal
     */
    private resetFlexboxValues(): void {
        this.flexDirectionValue = "";
        this.justifyContentValue = "";
        this.justifyItemsValue = "";
        this.alignContentValue = "";
        this.alignItemsValue = "";
        this.gapValue = "";
        this.flexWrapValue = "";
    }

    /**
     * Convert Flexbox object to a string
     * @returns A string that can be used as inline CSS
     */
    private convertFlexboxValuesToString(): string {
        return Object.entries({
            ...(this.flexEnabled
                ? {
                      display: "flex",
                  }
                : {}),
            ...(this.flexDirectionValue
                ? {
                      "flex-direction": this.flexDirectionValue,
                  }
                : {}),
            ...(this.justifyContentValue
                ? {
                      "justify-content": this.justifyContentValue,
                  }
                : {}),
            ...(this.justifyItemsValue
                ? {
                      "justify-items": this.justifyItemsValue,
                  }
                : {}),
            ...(this.alignContentValue
                ? {
                      "align-content": this.alignContentValue,
                  }
                : {}),
            ...(this.alignItemsValue
                ? {
                      "align-items": this.alignItemsValue,
                  }
                : {}),
            ...(this.gapValue
                ? {
                      gap: `${this.gapValue}px`,
                  }
                : {}),
            ...(this.flexWrapValue
                ? {
                      "flex-wrap": this.flexWrapValue,
                  }
                : {}),
        } as Record<FlexboxCSSPropertyName, string>)
            .map(
                ([propertyName, propertyValue]: [
                    FlexboxCSSPropertyName,
                    string
                ]): string => {
                    return `${propertyName}: ${propertyValue};`;
                }
            )
            .reduce((previousValue: string, currentValue: string): string => {
                return `${previousValue} ${currentValue}`;
            }, "")
            .trimStart();
    }
}
