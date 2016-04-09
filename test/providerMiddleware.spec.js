import { expect, spy } from 'cafeteria';
import providerMiddleware from '../src/index';

describe('providerMiddleware', () => {
  const testProvider = {
    name: '$test',
    $get() {
      return 'This is a test provider.';
    }
  };

  it('should add providers to thunk action', (done) => {
    const mockDispatch = spy();
    const mockGetState = spy();
    const next = spy();
    const action = ({ $test }) => {
      console.log($test);
      expect($test).to.be.equal('This is a test provider.');
      done();
      return {
        type: 'TEST',
        payload: $test
      };
    };
    providerMiddleware(testProvider)({ mockDispatch, mockGetState })(next)(action);
  });
});
