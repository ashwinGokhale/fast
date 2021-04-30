import { css } from "@microsoft/fast-element";

export const flexboxStyles = css`
    .root {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    label {
        display: block;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        margin: 10px 0 5px;
    }

    .flexbox-controls {
        display: none;
    }

    .flexbox-controls.active {
        display: block;
    }

    .css-gap {
        vertical-align: middle;
    }
`;
