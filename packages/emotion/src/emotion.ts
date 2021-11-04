import createEmotion, { Options } from '@emotion/css/create-instance/';
import { prefixer } from 'stylis';
import { logicalPropertiesPolyfil } from './logicalPropertiesPolyfil';

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/emotion%4010.0.6/packages/create-emotion/src/index.js
function createEmotionInstance() {
  const config: Options = {
    key: 'leafygreen-ui',
    prepend: true,
    stylisPlugins: [
      /// @ts-expect-error
      prefixer,
      logicalPropertiesPolyfil,
    ],
  };

  return createEmotion(config);
}

export default createEmotionInstance();
