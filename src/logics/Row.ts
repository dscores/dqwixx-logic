import Number from './Number';

export default class Row extends Array<Number> {
  public markNumber(numberIndex: number): string {
    if (this.isRowClosed()) {
      return;
    }
    if (this.isLastNumber(numberIndex) && this.countNumbersMarked() < 5) {
      return;
    }
    for (let i = 0; i < this.length; ++i) {
      if (i === numberIndex) {
        return this[i].markNumber();
      } else {
        this[i].skipNumber();
      }
    }
  }

  public closeRow() {
    if (this.isRowClosed()) {
      return;
    }
    for (let i = 0; i < this.length; ++i) {
      this[i].skipNumber();
    }
  }

  public isRowOpen(): boolean {
    return this.getLastNumber().isNumberOpen();
  }

  public isRowClosed(): boolean {
    return !this.isRowOpen();
  }

  public countNumbersMarkedByColor(color: string): number {
    let markedNumbers = this.filter((number: Number) => number.isNumberMarked() && number.getColor() === color).length;
    const lastNumber = this.getLastNumber();
    if (lastNumber.isNumberMarked() && lastNumber.getColor() === color) {
      ++markedNumbers;
    }
    return markedNumbers;
  }

  private getLastNumber(): Number {
    return this[this.length - 1];
  }

  private isLastNumber(numberIndex: number): boolean {
    return this.length - 1 === numberIndex;
  }

  private countNumbersMarked(): number {
    return this.filter((number: Number) => number.isNumberMarked()).length;
  }
}
