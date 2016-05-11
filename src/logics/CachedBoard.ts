import Board from './Board';
import Row from './Row';

export default class CachedBoard extends Board {
  private colorPoints = {};

  public setRows(rows: Array<Row>) {
    super.setRows(rows);
    this.colorPoints = {};
  }

  public markNumber(rowIndex: number, numberIndex: number): string {
    const color = super.markNumber(rowIndex, numberIndex);
    if (color) {
      delete this.colorPoints[color];
    }
    return color;
  }

  public getColorPoints(color: string): number {
    if (!this.colorPoints[color]) {
      this.colorPoints[color] = super.getColorPoints(color);
    }
    return this.colorPoints[color];
  }
}
