/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Number from '../../src/logics/Number';
import _Number from '../../src/logics/Number';
import Row from '../../src/logics/Row';

describe('[class] Row', () => {
  beforeEach(() => {
    this.row = new Row().setNumbers([
      new _Number('red', 2),
      new _Number('yellow', 3),
      new _Number('red', 4),
      new _Number('red', 5),
      new _Number('red', 6),
      new _Number('red', 7),
      new _Number('red', 8),
      new _Number('red', 9),
      new _Number('red', 10),
      new _Number('red', 11),
      new _Number('red', 12)
    ]);
  });

  describe('[method] constructor', () => {
    it('should be open', () => {
      expect(this.row.isRowOpen()).true;
      expect(this.row.isRowClosed()).false;
    });

    it('should have the last number disabled', () => {
      expect(this.row.isNumberDisabled(10)).true;
    });

    it('should not have the rest numbers disabled', () => {
      expect(this.row.isNumberDisabled(0)).false;
      expect(this.row.isNumberDisabled(1)).false;
      expect(this.row.isNumberDisabled(2)).false;
      expect(this.row.isNumberDisabled(3)).false;
      expect(this.row.isNumberDisabled(4)).false;
      expect(this.row.isNumberDisabled(5)).false;
      expect(this.row.isNumberDisabled(6)).false;
      expect(this.row.isNumberDisabled(7)).false;
      expect(this.row.isNumberDisabled(8)).false;
      expect(this.row.isNumberDisabled(9)).false;
    });

    it('should have all numbers open', () => {
      expect(this.row.getNumbers()[0].isNumberOpen()).true;
      expect(this.row.getNumbers()[1].isNumberOpen()).true;
      expect(this.row.getNumbers()[2].isNumberOpen()).true;
      expect(this.row.getNumbers()[3].isNumberOpen()).true;
      expect(this.row.getNumbers()[4].isNumberOpen()).true;
      expect(this.row.getNumbers()[5].isNumberOpen()).true;
      expect(this.row.getNumbers()[6].isNumberOpen()).true;
      expect(this.row.getNumbers()[7].isNumberOpen()).true;
      expect(this.row.getNumbers()[8].isNumberOpen()).true;
      expect(this.row.getNumbers()[9].isNumberOpen()).true;
      expect(this.row.getNumbers()[10].isNumberOpen()).true;
    });

    it('should have no marked numbers for both colors', () => {
      expect(this.row.countNumbersMarkedByColor('red')).equal(0);
      expect(this.row.countNumbersMarkedByColor('yellow')).equal(0);
    });
  });

  describe('[method] markNumber', () => {
    describe('[scenario] mark only the first number', () => {
      beforeEach(() => {
        this.row.markNumber(0);
      });

      it('should be open', () => {
        expect(this.row.isRowOpen()).true;
        expect(this.row.isRowClosed()).false;
      });

      it('should have the first number marked', () => {
        expect(this.row.getNumbers()[0].isNumberMarked()).true;
      });

      it('should have the rest numbers open', () => {
        expect(this.row.getNumbers()[1].isNumberOpen()).true;
        expect(this.row.getNumbers()[2].isNumberOpen()).true;
        expect(this.row.getNumbers()[3].isNumberOpen()).true;
        expect(this.row.getNumbers()[4].isNumberOpen()).true;
        expect(this.row.getNumbers()[5].isNumberOpen()).true;
        expect(this.row.getNumbers()[6].isNumberOpen()).true;
        expect(this.row.getNumbers()[7].isNumberOpen()).true;
        expect(this.row.getNumbers()[8].isNumberOpen()).true;
        expect(this.row.getNumbers()[9].isNumberOpen()).true;
        expect(this.row.getNumbers()[10].isNumberOpen()).true;
      });

      it('should have 1 marked number for red', () => {
        expect(this.row.countNumbersMarkedByColor('red')).equal(1);
      });

      it('should have 0 marked number for yellow', () => {
        expect(this.row.countNumbersMarkedByColor('yellow')).equal(0);
      });
    });

    describe('[scenario] mark only the second number', () => {
      beforeEach(() => {
        this.row.markNumber(1);
      });

      it('should be open', () => {
        expect(this.row.isRowOpen()).true;
        expect(this.row.isRowClosed()).false;
      });

      it('should have the first number skipped', () => {
        expect(this.row.getNumbers()[0].isNumberSkipped()).true;
      });

      it('should have the second number marked', () => {
        expect(this.row.getNumbers()[1].isNumberMarked()).true;
      });

      it('should have the rest numbers open', () => {
        expect(this.row.getNumbers()[2].isNumberOpen()).true;
        expect(this.row.getNumbers()[3].isNumberOpen()).true;
        expect(this.row.getNumbers()[4].isNumberOpen()).true;
        expect(this.row.getNumbers()[5].isNumberOpen()).true;
        expect(this.row.getNumbers()[6].isNumberOpen()).true;
        expect(this.row.getNumbers()[7].isNumberOpen()).true;
        expect(this.row.getNumbers()[8].isNumberOpen()).true;
        expect(this.row.getNumbers()[9].isNumberOpen()).true;
        expect(this.row.getNumbers()[10].isNumberOpen()).true;
      });

      it('should have 0 marked number for red', () => {
        expect(this.row.countNumbersMarkedByColor('red')).equal(0);
      });

      it('should have 1 marked number for yellow', () => {
        expect(this.row.countNumbersMarkedByColor('yellow')).equal(1);
      });
    });

    describe('[scenario] mark some more numbers and the last to close the row', () => {
      beforeEach(() => {
        this.row.markNumber(1);
        this.row.markNumber(3);
        this.row.markNumber(4);
        this.row.markNumber(5);
        this.row.markNumber(6);
        this.row.markNumber(8);
        this.row.markNumber(10);
      });

      it('should be closed', () => {
        expect(this.row.isRowOpen()).false;
        expect(this.row.isRowClosed()).true;
      });

      it('should not have the last number disabled', () => {
        expect(this.row.isNumberDisabled(10)).false;
      });

      it('should have some numbers marked', () => {
        expect(this.row.getNumbers()[1].isNumberMarked()).true;
        expect(this.row.getNumbers()[3].isNumberMarked()).true;
        expect(this.row.getNumbers()[4].isNumberMarked()).true;
        expect(this.row.getNumbers()[5].isNumberMarked()).true;
        expect(this.row.getNumbers()[6].isNumberMarked()).true;
        expect(this.row.getNumbers()[8].isNumberMarked()).true;
        expect(this.row.getNumbers()[10].isNumberMarked()).true;
      });

      it('should have some numbers skipped', () => {
        expect(this.row.getNumbers()[0].isNumberSkipped()).true;
        expect(this.row.getNumbers()[2].isNumberSkipped()).true;
        expect(this.row.getNumbers()[7].isNumberSkipped()).true;
        expect(this.row.getNumbers()[9].isNumberSkipped()).true;
      });

      it('should have 6 marked number + 1 for the closed row for red', () => {
        expect(this.row.countNumbersMarkedByColor('red')).equal(7);
      });

      it('should have 1 marked number for yellow', () => {
        expect(this.row.countNumbersMarkedByColor('yellow')).equal(1);
      });
    });

    describe('[scenario] try to mark the last number before mark enough numbers in the row', () => {
      beforeEach(() => {
        this.row.markNumber(10);
      });

      it('should still be open', () => {
        expect(this.row.isRowOpen()).true;
        expect(this.row.isRowClosed()).false;
      });

      it('should have the last number disabled', () => {
        expect(this.row.isNumberDisabled(10)).true;
      });

      it('should have the last number still be open', () => {
        expect(this.row.getNumbers()[10].isNumberOpen()).true;
      });
    });
  });

  describe('[method] closeRow', () => {
    describe('[scenario] close the row to skip all open numbers', () => {
      beforeEach(() => {
        this.row.markNumber(1);
        this.row.closeRow();
      });

      it('should be closed', () => {
        expect(this.row.isRowOpen()).false;
        expect(this.row.isRowClosed()).true;
      });

      it('should have the first number still skipped', () => {
        expect(this.row.getNumbers()[0].isNumberSkipped()).true;
      });

      it('should have the second number still marked', () => {
        expect(this.row.getNumbers()[1].isNumberMarked()).true;
      });

      it('should have the rest numbers skipped', () => {
        expect(this.row.getNumbers()[2].isNumberSkipped()).true;
        expect(this.row.getNumbers()[3].isNumberSkipped()).true;
        expect(this.row.getNumbers()[4].isNumberSkipped()).true;
        expect(this.row.getNumbers()[5].isNumberSkipped()).true;
        expect(this.row.getNumbers()[6].isNumberSkipped()).true;
        expect(this.row.getNumbers()[7].isNumberSkipped()).true;
        expect(this.row.getNumbers()[8].isNumberSkipped()).true;
        expect(this.row.getNumbers()[9].isNumberSkipped()).true;
        expect(this.row.getNumbers()[10].isNumberSkipped()).true;
      });

      it('should have 0 marked number for red', () => {
        expect(this.row.countNumbersMarkedByColor('red')).equal(0);
      });

      it('should have 1 marked number for yellow', () => {
        expect(this.row.countNumbersMarkedByColor('yellow')).equal(1);
      });
    });

    describe('[scenario] try to mark number after close the row', () => {
      beforeEach(() => {
        this.row.markNumber(1);
        this.row.closeRow();
        this.row.markNumber(2);
      });

      it('should have the third number still skipped', () => {
        expect(this.row.getNumbers()[2].isNumberSkipped()).true;
      });
    });
  });
});
