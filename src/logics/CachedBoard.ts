import Board, { JSONBoard } from './Board';
import Number from './Number';
import Row from './Row';

export default class CachedBoard extends Board {
  private colorPoints = {};

  public resume(jsonBoard: JSONBoard): Board {
    super.resume(jsonBoard);
    this.colorPoints = {};
    return this;
  }

  public setRows(rows: Row[]): CachedBoard {
    super.setRows(rows);
    this.colorPoints = {};
    return this;
  }

  public markNumber(rowIndex: number, numberIndex: number): Number {
    const number: Number = super.markNumber(rowIndex, numberIndex);
    if (number) {
      for (const color of number.getColors()) {
        delete this.colorPoints[color];
      }
    }
    return number;
  }

  public getColorPoints(color: string): number {
    if (!this.colorPoints[color]) {
      this.colorPoints[color] = super.getColorPoints(color);
    }
    return this.colorPoints[color];
  }
}
