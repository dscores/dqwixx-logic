/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
import { expect } from 'chai';

import Board from '../../src/logics/Board';
import classic from '../../src/themes/classic';

describe('[class] Board (without theme)', () => {
  beforeEach(() => {
    this.board = new Board();
  });

  describe('[method] constructor', () => {
    it('should be empty initialized without a theme', () => {
      expect(this.board.getRows().length).equal(0);
      expect(this.board.getFails().length).equal(0);
    });
  });
});

describe('[class] Board (with classic theme)', () => {
  beforeEach(() => {
    this.board = classic(new Board());
  });

  describe('[scenario] initialized board with classic theme', () => {
    it('should have 4 rows', () => {
      expect(this.board.getRows().length).equal(4);
    });

    it('should have 4 fails', () => {
      expect(this.board.getFails().length).equal(4);
    });

    it('should be open', () => {
      expect(this.board.isOpen()).true;
      expect(this.board.isFinished()).false;
    });
  });

  describe('[scenario] mark some numbers, fail some fails, close some rows have a finished board', () => {
    beforeEach(() => {
      this.board.markNumber(0, 1);
      this.board.markNumber(0, 3);
      this.board.markNumber(0, 4);
      this.board.markNumber(0, 5);
      this.board.markNumber(0, 6);
      this.board.markNumber(0, 8);
      this.board.markNumber(0, 10);

      this.board.markNumber(3, 0);
      this.board.markNumber(3, 1);

      this.board.failFail(0);
      this.board.failFail(1);

      this.board.closeRow(2);
    });

    it('should be finished', () => {
      expect(this.board.isOpen()).false;
      expect(this.board.isFinished()).true;
    });

    it('should have 4 fails', () => {
      expect(this.board.getFails().length).equal(4);
    });

    it('should only have 36 red color points', () => {
      expect(this.board.getColorPoints('red')).equal(36);
      expect(this.board.getColorPoints('yellow')).equal(0);
      expect(this.board.getColorPoints('green')).equal(0);
      expect(this.board.getColorPoints('blue')).equal(3);
    });

    it('should have -10 fail points', () => {
      expect(this.board.getFailPoints()).equal(-10);
    });

    it('should have 26 points', () => {
      expect(this.board.getPoints()).equal(29);
    });
  });

  describe('[scenario] try to do some things after finishing the board', () => {
    beforeEach(() => {
      this.board.closeRow(0);
      this.board.closeRow(1);

      this.board.markNumber(2, 0);
      this.board.failFail(0);
      this.board.closeRow(2);
    });

    it('should be finished', () => {
      expect(this.board.isOpen()).false;
      expect(this.board.isFinished()).true;
    });

    it('should still does not have green color points', () => {
      expect(this.board.getColorPoints('green')).equal(0);
    });

    it('should still does not have fail points', () => {
      expect(this.board.getFailPoints()).equal(0);
    });

    it('should still have third row open', () => {
      expect(this.board.getRows()[2].isRowOpen()).true;
    });
  });
});
