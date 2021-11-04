// import { StylisPlugin } from '@emotion/cache';
import { StylisPlugin } from '@emotion/css/node_modules/@emotion/cache';
import { serialize } from 'stylis';

// const { direction } = getComputedStyle(document.body);

const logicalProps = [
  // Properties for sizing
  'block-size',
  'inline-size',
  'max-block-size',
  'max-inline-size',
  'min-block-size',
  'min-inline-size',

  // Properties for margins, borders and padding
  'border-block',
  'border-block-color',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-style',
  'border-block-width',
  // 'border-color',
  'border-inline',
  'border-inline-color',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-style',
  'border-inline-width',
  'border-start-start-radius',
  'border-start-end-radius',
  'border-end-start-radius',
  'border-end-end-radius',
  // 'border-style',
  // 'border-width',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',

  // Properties for floating and positioning
  // 'inset',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',

  // Other properties
  'overflow-block',
  'overflow-inline',
  'overscroll-behavior-block',
  'overscroll-behavior-inline',
];

const propsWithLogicalValues = [
  'clear', // (inline-end and inline-start keywords)
  'float', // (inline-end and inline-start keywords)
  'caption-side', //(inline-end and inline-start keywords)
  'resize', // (block and inline keywords)
  'text-align', // (end and start keywords)
];

export const logicalPropertiesPolyfil: StylisPlugin = (
  element,
  index,
  children,
  callback,
): string | undefined => {
  const prop: string = Array.isArray(element.props)
    ? element.props.join('')
    : (element.props as string);

  if (logicalProps.includes(prop)) {
    const { value } = element;
    const rules = [value];

    if (value.includes('block')) {
      rules.push(value.replace('block', 'top'));
      rules.push(value.replace('block', 'bottom'));
    } else if (value.includes('inline')) {
      rules.push(value.replace('inline', 'left'));
      rules.push(value.replace('inline', 'right'));
    }

    return rules.join(';');
  }

  return element.return;
};
