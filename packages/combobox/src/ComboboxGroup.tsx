import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { palette } from '@leafygreen-ui/palette';
import React, { useContext } from 'react';
import { ComboboxGroupProps } from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';

const comboboxGroupStyle = (darkMode: boolean) => css`
  --lg-combobox-group-label-color: ${darkMode
    ? palette.gray.light1
    : palette.gray.dark1};
  --lg-combobox-group-border-color: ${darkMode
    ? palette.gray.dark1
    : palette.gray.light1};
  padding-top: 8px;
  border-bottom: none;
`;

const comboboxGroupLabel = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--lg-combobox-group-label-color);
`;

export function InternalComboboxGroup({
  label,
  className,
  children,
}: ComboboxGroupProps): JSX.Element {
  const { darkMode } = useContext(ComboboxContext);

  const groupId = useIdAllocator({ prefix: 'combobox-group' });
  const childCount = React.Children.count(children);

  return childCount > 0 ? (
    <div className={cx(comboboxGroupStyle(darkMode), className)}>
      <div className={comboboxGroupLabel} id={groupId}>
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

ComboboxGroup.displayName = 'ComboboxGroup';

export default function ComboboxGroup(_: ComboboxGroupProps): JSX.Element {
  throw Error('`ComboboxGroup` must be a child of a `Combobox` instance');
}
