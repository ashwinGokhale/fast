import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "@microsoft/fast-foundation";

/**
 * A form-associated base class for the flexbox component.
 *
 * @internal
 */
export class FormAssociatedFlexbox extends FormAssociated(
    class extends FASTElement {
        public proxy: HTMLInputElement = document.createElement("input");
    }
) {}

/**
 * @internal
 */
export interface FormAssociatedFlexbox extends FormAssociated {}
