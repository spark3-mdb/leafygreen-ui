/**
 * Styles
 */

import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { isArray } from 'lodash';
import { transparentize } from 'polished';
import { ComboboxSize, Overflow, State, Mode } from './Combobox.types';

export const comboboxParentStyle = ({
  mode,
  size,
  overflow,
}: {
  mode: Mode;
  size: ComboboxSize;
  overflow: Overflow;
}) => {
  const modeStyle: Record<Mode, string> = {
    [Mode.Light]: css`
      // Base
      --lg-combobox-text-color: ${palette.gray.dark3};
      --lg-combobox-background-color: ${palette.white};
      --lg-combobox-border-color: ${palette.gray.base};
      --lg-combobox-shadow: unset;

      // Focus
      --lg-combobox-background-color-focus: ${palette.white};
      --lg-combobox-shadow-focus: 0px 1px 1px
        ${transparentize(0.75, palette.gray.dark3)};

      // Disabled
      --lg-combobox-text-color-disabled: ${palette.gray.base};
      --lg-combobox-background-color-disabled: ${palette.gray.light2};
      --lg-combobox-border-color-disabled: ${palette.gray.light1};

      // Error
      --lg-combobox-color-error: ${palette.red.base};
      --lg-combobox-border-color-error: ${palette.red.base};
    `,
    [Mode.Dark]: css``,
  };

  const sizeStyle: Record<ComboboxSize, string> = {
    [ComboboxSize.Default]: css`
      --lg-combobox-padding-y: 7px;
      --lg-combobox-padding-x: 11px;
      --lg-combobox-font-size: 13px;
      --lg-combobox-line-height: 20px;
      --lg-combobox-border-radius: 6px;
      --lg-combobox-height: 24px;
      --lg-combobox-input-default-width: 12ch;
      --lg-combobox-icon-height: 16px;
    `,
  };

  return cx(
    modeStyle[mode],
    sizeStyle[size],
    css`
      --lg-combobox-width: ${overflow === 'expand-x' ? 'unset' : '100%'};
      --lg-combobox-padding: var(--lg-combobox-padding-y)
        var(--lg-combobox-padding-x) var(--lg-combobox-padding-y);
      ${overflow === 'scroll-x' ? '0' : 'var(--lg-combobox-padding-x)'};
      width: var(--lg-combobox-width);
    `,
  );
};

export const comboboxStyle = css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-family: ${fontFamilies.default};
  padding: var(--lg-combobox-padding);
  color: var(--lg-combobox-text-color);
  background-color: var(--lg-combobox-background-color);
  box-shadow: var(--lg-combobox-shadow);
  border: 1px solid var(--lg-combobox-border-color);
  border-radius: var(--lg-combobox-border-radius);
  width: var(--lg-combobox-width);
  cursor: text;
  transition: 150ms ease-in-out;
  transition-property: background-color, box-shadow;
  min-width: 256px;

  &:focus-within {
    background-color: var(--lg-combobox-background-color-focus);
    box-shadow: var(--lg-combobox-shadow-focus);
  }

  &[data-disabled='true'] {
    color: var(--lg-combobox-text-color-disabled);
    background-color: var(--lg-combobox-background-color-disabled);
    border-color: var(--lg-combobox-border-color-disabled);
    box-shadow: unset;
    cursor: not-allowed;
  }

  &[data-state='error'] {
    border-color: var(--lg-combobox-border-color-error);
  }
`;

export const interactionRingStyle = css`
  width: var(--lg-combobox-width);
`;

export const interactionRingColor = ({
  state,
  darkMode,
}: {
  state: State;
  darkMode: boolean;
}) => {
  if (darkMode) {
    return {
      hovered: state === 'error' ? palette.red.dark2 : undefined,
    };
  } else {
    return {
      hovered: state === 'error' ? palette.red.light3 : undefined,
    };
  }
};

export const inputWrapperStyle = ({
  overflow,
  isOpen,
  selection,
  value,
}: {
  overflow: Overflow;
  isOpen: boolean;
  selection: string | Array<string> | null;
  value?: string;
}) => {
  const isMultiselect = isArray(selection) && selection.length > 0;
  const inputLength = value?.length ?? 0;

  // The input should be hidden when there are elements selected in a multiselect
  // We don't set \`display: none\` since we need to be able to set .focus() on the element
  const inputWidth = isMultiselect
    ? isOpen || inputLength > 0
      ? `${inputLength + 1}ch`
      : '0'
    : 'var(--lg-combobox-input-default-width)';

  const baseWrapperStyle = css`
    flex-grow: 1;
    width: var(--lg-combobox-width);

    --lg-combobox-input-width: ${inputWidth};
  `;

  switch (overflow) {
    case 'scroll-x': {
      return css`
        ${baseWrapperStyle}
        display: block;
        height: var(--lg-combobox-height);
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;
        /*
         * Immediate transition in, slow transition out. 
         * '-in' transition is handled by \`scroll-behavior\` 
         */
        --lg-combobox-input-transition: width ease-in-out
          ${isOpen ? '0' : '100ms'};

        &::-webkit-scrollbar {
          display: none;
        }

        & > * {
          margin-inline: 2px;

          &:first-child {
            margin-inline-start: var(--lg-combobox-padding-x);
          }

          &:last-child {
            margin-inline-end: var(--lg-combobox-padding-x);
          }
        }
      `;
    }

    case 'expand-x': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
        white-space: nowrap;
        --lg-combobox-input-transition: width 150ms ease-in-out;
      `;
    }

    // TODO - look into animating input element height on wrap
    case 'expand-y': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        overflow-x: visible;
      `;
    }
  }
};

export const inputElementStyle = css`
  font-family: ${fontFamilies.default};
  border: none;
  cursor: inherit;
  background-color: inherit;
  box-sizing: content-box;
  /* padding-block: calc(
    (var(--lg-combobox-height) - var(--lg-combobox-line-height)) / 2
  ); */
  padding-inline: 0;
  height: var(--lg-combobox-line-height);
  width: var(
    --lg-combobox-input-width,
    var(--lg-combobox-input-default-width, auto)
  );
  transition: var(--lg-combobox-input-transition);

  &:focus {
    outline: none;
  }
`;

export const clearButton = css`
  // Add a negative margin so the button takes up the same space as the regular icons
  margin-block: calc(var(--lg-combobox-icon-height) / 2 - 100%);
`;

export const errorMessageStyle = css`
  font-family: ${fontFamilies.default};
  font-size: var(--lg-combobox-font-size);
  line-height: var(--lg-combobox-line-height);
  color: var(--lg-combobox-color-error);
  padding-top: var(--lg-combobox-padding-y);
`;

export const endIcon = css`
  margin-inline-end: calc(var(--lg-combobox-padding-x) / 2);
`;

const loadingIconAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
export const loadingIconStyle = css`
  animation: ${loadingIconAnimation} 1.5s linear infinite;
`;

/**
 * Menu styles
 */
export const menuWrapperStyle = ({
  darkMode,
  size,
  width = 384,
}: {
  darkMode: boolean;
  size: ComboboxSize;
  width?: number;
}) => {
  let menuModeStyle, menuSizeStyle;

  if (darkMode) {
    menuModeStyle = css``;
  } else {
    menuModeStyle = css`
      --lg-combobox-menu-color: ${palette.gray.dark3};
      --lg-combobox-menu-message-color: ${palette.gray.dark1};
      --lg-combobox-menu-background-color: ${palette.white};
      --lg-combobox-menu-shadow: 0px 4px 7px
        ${transparentize(0.75, palette.black)};
      --lg-combobox-item-hover-color: ${palette.gray.light2};
      --lg-combobox-item-active-color: ${palette.blue.light3};
      --lg-combobox-item-wedge-color: ${palette.blue.base};
    `;
  }

  switch (size) {
    case 'default':
      menuSizeStyle = css`
        --lg-combobox-menu-padding-y: 8px;
        --lg-combobox-menu-border-radius: 12px;
        --lg-combobox-item-height: 36px;
        --lg-combobox-item-padding-y: 8px;
        --lg-combobox-item-padding-x: 12px;
        --lg-combobox-item-font-size: 13px;
        --lg-combobox-item-line-height: 20px;
        --lg-combobox-item-wedge-height: 22px;
      `;
  }

  return cx(
    menuModeStyle,
    menuSizeStyle,
    css`
      width: ${width}px;
      border-radius: var(--lg-combobox-menu-border-radius);
      border: none;

      & > * {
        border-radius: inherit;
      }
    `,
  );
};

export const menuStyle = ({ maxHeight }: { maxHeight: number }) => css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: var(--lg-combobox-menu-padding-y) 0;
  font-family: ${fontFamilies.default};
  color: var(--lg-combobox-menu-color);
  background-color: var(--lg-combobox-menu-background-color);
  box-shadow: var(--lg-combobox-menu-shadow);
  border-radius: inherit;
  overflow: auto;
  min-height: var(--lg-combobox-item-height);
  max-height: ${maxHeight}px;
  scroll-behavior: smooth;
`;

export const menuList = css`
  position: relative;
  margin: 0;
  padding: 0;
`;

export const menuMessage = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--lg-combobox-item-font-size);
  color: var(--lg-combobox-menu-message-color);
  padding: var(--lg-combobox-item-padding-y) var(--lg-combobox-item-padding-x);

  & > svg {
    width: 1em;
    height: 1em;
  }
`;
