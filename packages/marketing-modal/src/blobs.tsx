import * as React from 'react';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { BlobPosition } from '.';

type SvgBlobProperties = 'viewBox' | 'path' | 'fill' | 'styles';

const svgBlobPaths: Record<BlobPosition, Record<SvgBlobProperties, string>> = {
  [BlobPosition.TopLeft]: {
    viewBox: '0 0 265 501',
    path:
      'M-10.0239 -12.0209L154.458 -12.0208C215.515 -12.0208 265 52.2446 265 131.538C265 210.041 215.934 273.615 155.523 273.467L98.8817 273.318C68.886 273.269 44.5623 304.808 44.5623 343.714L44.5623 346.186C44.5623 385.091 20.2765 416.581 -9.64308 416.581L-10.709 416.581C-40.7047 416.581 -64.9905 448.219 -64.9144 487.174C-64.8382 526.129 -89.1241 557.767 -119.12 557.767L-120.604 557.767C-150.524 557.767 -174.772 526.277 -174.81 487.421L-175 201.242C-175.038 162.336 -150.752 130.797 -120.795 130.797L-118.435 130.797C-88.477 130.797 -64.2292 99.2574 -64.2292 60.4015L-64.2292 58.3251C-64.2292 19.5186 -39.9815 -12.0209 -10.0239 -12.0209Z',
    fill: `${palette.purple.light3}`,
    styles: css`
      top: 0;
      left: 0;
      width: 265px;
      max-width: 80%;
    `,
  },
  [BlobPosition.TopRight]: {
    viewBox: '0 0 342 368',
    path:
      'M474 92.9761L474 257.458C474 318.515 420.538 368 354.575 368C289.269 368 236.383 318.934 236.506 258.523L236.63 201.882C236.671 171.886 210.434 147.562 178.069 147.562L176.012 147.562C143.648 147.562 117.451 123.277 117.451 93.357L117.451 92.291C117.451 62.2953 91.1317 38.0095 58.7256 38.0857C26.3196 38.1618 -4.40929e-07 13.876 -3.06323e-06 -16.1197L-3.19302e-06 -17.6043C-5.80867e-06 -47.5239 26.1962 -71.7716 58.52 -71.8097L296.589 -72C328.954 -72.038 355.192 -47.7522 355.192 -17.7946L355.192 -15.4346C355.192 14.5231 381.429 38.7708 413.753 38.7708L415.48 38.7708C447.763 38.7708 474 63.0185 474 92.9761Z',
    fill: `${palette.purple.light3}`,
    styles: css`
      top: 0;
      right: 0;
      width: 342px;
      max-width: 80%;
    `,
  },
  [BlobPosition.BottomRight]: {
    viewBox: '0 0 322 501',
    path:
      'M323.778 501L130.139 501C58.2575 501 -2.75101e-06 434.759 -6.14535e-06 353.027C-9.50583e-06 272.11 57.7646 206.582 128.884 206.735L195.566 206.888C230.88 206.939 259.515 174.43 259.515 134.328L259.515 131.78C259.515 91.6788 288.106 59.2206 323.33 59.2206L324.585 59.2206C359.898 59.2206 388.489 26.6094 388.399 -13.5431C388.309 -53.6956 416.901 -86.3068 452.214 -86.3068L453.961 -86.3068C489.185 -86.3068 517.731 -53.8486 517.776 -13.798L518 281.18C518.045 321.282 489.454 353.791 454.185 353.791L451.407 353.791C416.139 353.791 387.593 386.3 387.593 426.351L387.593 428.491C387.593 468.491 359.046 501 323.778 501Z',
    fill: `${palette.purple.light3}`,
    styles: css`
      right: 0;
      bottom: 0;
      width: 322px;
      max-width: 70%;
    `,
  },
};

function svgBlobs(blobPosition: BlobPosition) {
  const { viewBox, path, fill, styles } = svgBlobPaths[blobPosition];

  const blobStyles = css`
    position: absolute;
    z-index: -1;
  `;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(blobStyles, styles)}
      aria-hidden="true"
      data-testid="svg-blob"
    >
      <path opacity="0.6" d={path} fill={fill} />
    </svg>
  );
}

export default svgBlobs;
