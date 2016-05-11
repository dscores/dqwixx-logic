/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Number from '../../src/logics/Number';

describe('[class] Number', () => {
  beforeEach(() => {
    this.number = new Number('red', 2);
  });

  describe('[method] constructor', () => {
    it('should have the right color', () => {
      expect(this.number.getColor()).equal('red');
    });

    it('should have the right label', () => {
      expect(this.number.getLabel()).equal(2);
    });

    it('should only be open', () => {
      expect(this.number.isNumberOpen()).true;
      expect(this.number.isNumberMarked()).false;
      expect(this.number.isNumberSkipped()).false;
    });
  });

  describe('[method] markNumber', () => {
    beforeEach(() => {
      this.number.markNumber();
    });

    it('should only be marked', () => {
      expect(this.number.isNumberOpen()).false;
      expect(this.number.isNumberMarked()).true;
      expect(this.number.isNumberSkipped()).false;
    });

    describe('[scenario] if already marked and try to skip', () => {
      beforeEach(() => {
        this.number.markNumber();
        this.number.skipNumber();
      });

      it('should only be marked', () => {
        expect(this.number.isNumberOpen()).false;
        expect(this.number.isNumberMarked()).true;
        expect(this.number.isNumberSkipped()).false;
      });
    });
  });

  describe('[method] skipNumber', () => {
    beforeEach(() => {
      this.number.skipNumber();
    });

    it('should only be skipped', () => {
      expect(this.number.isNumberOpen()).false;
      expect(this.number.isNumberMarked()).false;
      expect(this.number.isNumberSkipped()).true;
    });

    describe('[scenario] if already skipped and try to mark', () => {
      beforeEach(() => {
        this.number.skipNumber();
        this.number.markNumber();
      });
      it('should only be skipped', () => {
        expect(this.number.isNumberOpen()).false;
        expect(this.number.isNumberMarked()).false;
        expect(this.number.isNumberSkipped()).true;
      });
    });
  });
});
