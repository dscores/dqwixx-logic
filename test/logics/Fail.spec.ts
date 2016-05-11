/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Fail from '../../src/logics/Fail';

describe('[class] Fail', () => {
  beforeEach(() => {
    this.fail = new Fail();
  });

  describe('[method] constructor', () => {
    it('should only be open', () => {
      expect(this.fail.isFailOpen()).true;
      expect(this.fail.isFailFailed()).false;
    });
  });

  describe('[method] failFail', () => {
    beforeEach(() => {
      this.fail.failFail();
    });

    it('should only be failed', () => {
      expect(this.fail.isFailOpen()).false;
      expect(this.fail.isFailFailed()).true;
    });
  });
});
