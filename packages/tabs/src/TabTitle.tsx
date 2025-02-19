import React, { useRef, useEffect, RefObject } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Mode } from './Tabs';
import { getNodeTextContent } from './getNodeTextContent';

const pseudoBold = `
  0.0625px 0 currentColor,
  -0.0625px 0 currentColor,
  0 0.0625px currentColor,
  0 -0.0625px currentColor
`;

interface ListTitleMode {
  base: string;
  hover: string;
  focus: string;
  selected: string;
  disabled: string;
}

const listTitleModeStyles: Record<Mode, ListTitleMode> = {
  light: {
    base: css`
      color: ${palette.gray.dark1};
      font-weight: 500;
      font-family: ${fontFamilies.default};
      font-size: 13px;
    `,
    hover: css`
      &:hover {
        cursor: pointer;
        color: ${palette.gray.dark3};
        &:after {
          background-color: ${palette.gray.light2};
        }
      }
    `,
    focus: css`
      &:focus {
        color: ${palette.blue.base};
        text-shadow: ${pseudoBold};

        &:after {
          background-color: ${palette.blue.light1};
        }
      }
    `,
    selected: css`
      color: ${palette.green.dark2};
      text-shadow: ${pseudoBold};

      &:after {
        transform: scaleX(1);
        background-color: ${palette.green.dark1};
      }

      &:hover {
        color: ${palette.green.dark2};

        &:after {
          transform: scaleX(1);
          background-color: ${palette.green.dark1};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.light1};
    `,
  },

  dark: {
    base: css`
      color: ${uiColors.gray.light1};
      font-weight: 600;
      font-family: ${fontFamilies.legacy};
      font-size: 16px;
    `,
    hover: css`
      &:hover {
        cursor: pointer;

        &:not(:focus) {
          color: ${uiColors.white};

          &:after {
            background-color: ${uiColors.gray.dark1};
          }
        }
      }
    `,
    focus: css`
      &:focus {
        color: ${uiColors.blue.light1};

        &:after {
          background-color: ${uiColors.focus};
        }
      }
    `,
    selected: css`
      color: ${uiColors.green.light2};

      &:after {
        transform: scaleX(1);
        background-color: ${uiColors.green.base};
      }

      &:hover {
        color: ${uiColors.green.light2};
        font-weight: 700;

        &:after {
          transform: scaleX(1);
          background-color: ${uiColors.green.base};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${uiColors.gray.dark1};
    `,
  },
};

const listTitle = css`
  position: relative;
  max-width: 300px;
  padding: 12px 16px;
  background-color: transparent;
  border: 0px;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 150ms color ease-in-out;

  &:focus {
    outline: none;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    border-radius: 4px 4px 0 0;
    transition: all 150ms ease-in-out;
    background-color: transparent;
    transform: scaleX(0.8);
  }

  &:hover:after {
    transform: scaleX(0.95);
  }

  &:active:after {
    &:after {
      transform: scaleX(1);
    }
  }

  > * {
    vertical-align: middle;
  }
`;

interface BaseTabTitleProps {
  darkMode?: boolean;
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isAnyTabFocused?: boolean;
  parentRef?: HTMLDivElement;
  [key: string]: any;
}

const TabTitle: ExtendableBox<BaseTabTitleProps, 'button'> = ({
  selected = false,
  disabled = false,
  children,
  className,
  darkMode,
  parentRef,
  ...rest
}: BaseTabTitleProps) => {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const mode = darkMode ? Mode.Dark : Mode.Light;

  // Checks to see if the current activeElement is a part of the same tab set
  // as the current TabTitle. If so, and the current TabTitle is not disabled
  // and is selected, we manually move focus to that TabTitle.
  useEffect(() => {
    const tabsList = Array.from(parentRef?.children ?? []);
    const activeEl = document.activeElement;

    if (
      activeEl &&
      tabsList.indexOf(activeEl) !== -1 &&
      !disabled &&
      selected &&
      titleRef.current
    ) {
      titleRef.current.focus();
    }
  }, [parentRef, disabled, selected, titleRef]);

  const sharedTabProps = {
    ...rest,
    className: cx(
      listTitle,
      listTitleModeStyles[mode].base,
      {
        [listTitleModeStyles[mode].selected]: selected,
        [listTitleModeStyles[mode].focus]: showFocus,
        [listTitleModeStyles[mode].hover]: !disabled && !selected,
        [listTitleModeStyles[mode].disabled]: disabled,
      },
      className,
    ),
    role: 'tab',
    tabIndex: selected ? 0 : -1,
    ['aria-selected']: selected,
    name: getNodeTextContent(rest.name),
  } as const;

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={titleRef as RefObject<HTMLAnchorElement>}
        {...sharedTabProps}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="button"
      ref={titleRef as RefObject<HTMLButtonElement>}
      {...sharedTabProps}
    >
      {children}
    </Box>
  );
};

TabTitle.displayName = 'TabTitle';

export default TabTitle;
