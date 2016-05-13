import Row, { JSONNumber } from './Row';
import Fail, { FailState } from './Fail';

export interface JSONBoard {
  rows: JSONNumber[][];
  fails: JSONFail[];
}

interface JSONFail {
  state: FailState;
}

export default class Board {
  private rows: Row[] = [];
  private fails: Fail[] = [];

  public resume(jsonBoard: JSONBoard): Board {
    this.rows = jsonBoard.rows.map((row: JSONNumber[]) => (new Row().resume(row)));
    this.fails = jsonBoard.fails.map((fail: JSONFail) => (new Fail()).resume(fail.state));
    return this;
  }

  public setRows(rows: Row[]) {
    this.rows = rows;
  }

  public getRows(): Row[] {
    return this.rows;
  }

  public setFails(fails: number) {
    this.fails = Array.apply({}, Array(fails)).map(() => new Fail());
  }

  public getFails(): Fail[] {
    return this.fails;
  }

  public markNumber(rowIndex: number, numberIndex: number): string {
    if (this.isFinished()) {
      return;
    }
    return this.rows[rowIndex].markNumber(numberIndex);
  }

  public closeRow(rowIndex: number) {
    if (this.isFinished()) {
      return;
    }
    this.rows[rowIndex].closeRow();
  }

  public failFail(failIndex: number) {
    if (this.isFinished()) {
      return;
    }
    this.fails[failIndex].failFail();
  }

  public getColorPoints(color: string): number {
    const marked = this.getRows().map((row: Row) => row.countNumbersMarkedByColor(color))
      .reduce((colorPointsA: number, colorPointsB: number) => colorPointsA + colorPointsB, 0);
    let colorPoints = 0;
    for (let increase = 1; increase <= marked; ++increase) {
      colorPoints += increase;
    }
    return colorPoints;
  }

  public getFailPoints(): number {
    return this.countFailsFailed() * -5;
  }

  public getPoints(): number {
    let points = 0;
    for (const color of ['red', 'yellow', 'green', 'blue']) {
      points += this.getColorPoints(color);
    }
    points += this.getFailPoints();
    return points;
  }

  public isOpen(): boolean {
    return this.countRowsClosed() < 2 && this.countFailsFailed() < 4;
  }

  public isFinished(): boolean {
    return !this.isOpen();
  }

  private countRowsClosed(): number {
    return this.getRows().filter((row: Row) => row.isRowClosed()).length;
  }

  private countFailsFailed(): number {
    return this.getFails().filter((fail: Fail) => fail.isFailFailed()).length;
  }
}
