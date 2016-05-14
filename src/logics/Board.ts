import Number from './Number';
import Row, { JSONNumber, JSONRow } from './Row';
import Fail, { FailState } from './Fail';

export interface JSONBoard {
  rows: JSONRow[];
  fails: JSONFail[];
}

interface JSONFail {
  state: FailState;
}

export default class Board {
  private rows: Row[] = [];
  private fails: Fail[] = [];

  public resume(jsonBoard: JSONBoard): Board {
    this.setRows(jsonBoard.rows.map((row: JSONRow) => new Row().resume(row)));
    jsonBoard.rows.forEach((jsonRow: JSONRow, rowIndex) => {
      const linkedRows: Row[] = [];
      for (const linkedRowIndex of jsonRow.linkedRowIndexes) {
        linkedRows.push(this.rows[linkedRowIndex]);
      }
      this.rows[rowIndex].setLinkedRows(linkedRows);
    });
    this.fails = jsonBoard.fails.map((fail: JSONFail) => new Fail().resume(fail.state));
    return this;
  }

  public setRows(rows: Row[]): Board {
    rows.forEach((row: Row, rowIndex) => {
      row.setRowIndex(rowIndex);
    });
    this.rows = rows;
    return this;
  }

  public getRows(): Row[] {
    return this.rows;
  }

  public setFails(fails: number): Board {
    this.fails = Array.apply({}, Array(fails)).map(() => new Fail());
    return this;
  }

  public getFails(): Fail[] {
    return this.fails;
  }

  public markNumber(rowIndex: number, numberIndex: number): Number {
    if (this.isFinished()) {
      return;
    }
    return this.rows[rowIndex].markNumber(numberIndex);
  }

  public closeRow(rowIndex: number): Board {
    if (this.isFinished()) {
      return this;
    }
    this.rows[rowIndex].closeRow();
    return this;
  }

  public failFail(failIndex: number): Board {
    if (this.isFinished()) {
      return this;
    }
    this.fails[failIndex].failFail();
    return this;
  }

  public getColorPoints(color: string): number {
    const marked = this.getRows().map((row: Row) => row.countNumbersMarkedByColor(color))
      .reduce((colorPointsA: number, colorPointsB: number) => colorPointsA + colorPointsB, 0);
    let colorPoints = 0;
    for (let increase = 1; increase <= Math.min(marked, 15); ++increase) {
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
