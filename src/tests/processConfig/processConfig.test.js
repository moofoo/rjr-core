import processConfig from '../../util/processConfig';
import config from './config.json';
import result from './result';

describe('processConfig', () => {
  test('handles partial replacement', () => {
    const processed = processConfig(config);

    expect(processed).toEqual(result);
  });
});
