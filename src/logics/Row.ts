import Number, { NumberState } from './Number';
import _Number from './Number';

export interface JSONNumber {
  color: string;
  label: number;
  state: NumberState;
}

export interface JSONRow {
  numbers: JSONNumber[];
  bigPoints: boolean;
  linkedRowIndexes: number[];
}

export default class Row {
  private rowIndex: number;
  private numbers: Number[] = [];
  private bigPoints: boolean = false;
  private linkedRows: Row[] = [];

  public resume(jsonRow: JSONRow): Row {
    const numbers: Number[] = [];
    for (const jsonNumber of jsonRow.numbers) {
      const number: Number = new _Number(jsonNumber.color, jsonNumber.label);
      numbers.push(number.resume(jsonNumber.state));
    }
    this.setNumbers(numbers);
    if (jsonRow.bigPoints) {
      this.enableBigPoints();
    }
    return this;
  }

  public toJSON() {
    return {
      numbers: this.getNumbers(),
      bigPoints: this.isBigPoints(),
      linkedRowIndexes: this.getLinkedRows().map((row: Row) => row.getRowIndex())
    };
  }

  public setRowIndex(rowIndex: number): Row {
    this.rowIndex = rowIndex;
    return this;
  }

  public getRowIndex(): number {
    return this.rowIndex;
  }

  public setNumbers(numbers: Number[]): Row {
    this.numbers = numbers;
    return this;
  }

  public getNumbers(): Number[] {
    return this.numbers;
  }

  public enableBigPoints(): Row {
    this.bigPoints = true;
    return this;
  }

  public isBigPoints(): boolean {
    return this.bigPoints;
  }

  public setLinkedRows(linkedRows: Row[]): Row {
    this.linkedRows = linkedRows;
    return this;
  }

  public getLinkedRows(): Row[] {
    return this.linkedRows;
  }

  public markNumber(numberIndex: number): Number {
    if (this.isRowClosed()) {
      return;
    }
    if (this.isNumberDisabled(numberIndex)) {
      return;
    }
    const numbers = this.getNumbers();
    for (let i = 0; i < numbers.length; ++i) {
      if (i === numberIndex) {
        return numbers[i].markNumber();
      } else {
        numbers[i].skipNumber();
      }
    }
  }

  public closeRow(): Row {
    if (this.isBigPoints()) {
      return this;
    }
    if (this.isRowClosed()) {
      return this;
    }
    for (const number of this.getNumbers()) {
      number.skipNumber();
    }
    return this;
  }

  public isRowOpen(): boolean {
    if (this.isBigPoints()) {
      return true;
    }
    return this.getLastNumber().isNumberOpen();
  }

  public isRowClosed(): boolean {
    return !this.isRowOpen();
  }

  public countNumbersMarkedByColor(color: string): number {
    let markedNumbers = this.getNumbers().filter((number: Number) => number.isNumberMarked() && number.includesColor(color)).length;
    if (this.isBigPoints()) {
      return markedNumbers;
    }
    const lastNumber = this.getLastNumber();
    if (lastNumber.isNumberMarked() && lastNumber.includesColor(color)) {
      ++markedNumbers;
    }
    return markedNumbers;
  }

  public isNumberDisabled(numberIndex: number): boolean {
    if (this.isBigPoints()) {
      return !this.getMarkedLinkedRowIndexes(numberIndex).length;
    }
    return this.isLastNumber(numberIndex) && this.countNumbersMarked() < 5;
  }

  public getMarkedLinkedRowIndexes(numberIndex: number): number[] {
    const markedLinkedRowIndexes = [];
    const linkedRows = this.getLinkedRows();
    for (const linkedRowIndex in linkedRows) {
      const linkedRow = linkedRows[linkedRowIndex];
      if (linkedRow.getNumbers()[numberIndex].isNumberMarked()) {
        markedLinkedRowIndexes.push(linkedRowIndex);
      }
    }
    return markedLinkedRowIndexes;
  }

  public getLastNumber(): Number {
    const numbers: Number[] = this.getNumbers();
    return numbers[numbers.length - 1];
  }

  private isLastNumber(numberIndex: number): boolean {
    return this.getNumbers().length - 1 === numberIndex;
  }

  private countNumbersMarked(): number {
    return this.getNumbers().filter((number: Number) => number.isNumberMarked()).length;
  }
}
