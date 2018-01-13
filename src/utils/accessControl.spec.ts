import { expect } from 'chai';
import 'mocha';

import { accessControl } from './accessControl';

describe('Hello function', () => {
  it('should return hello world', () => {
    expect(accessControl.can('guest').createOwn('user').granted).to.be.true;
  });
});
