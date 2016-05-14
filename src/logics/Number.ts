export enum NumberState {
  Open = 1,
  Marked,
  Skipped
}

export default class Number {
  private color: string;
  private label: number;
  private state: NumberState = NumberState.Open;

  constructor(color: string, label: number) {
    this.color = color;
    this.label = label;
  }

  public resume(state: NumberState): Number {
    this.state = state;
    return this;
  }

  public getColor(): string {
    return this.color;
  }

  public getColors(): string[] {
    return this.getColor().split('-');
  }

  public includesColor(color: string): boolean {
    return this.getColors().indexOf(color) !== -1;
  }

  public getLabel(): number {
    return this.label;
  }

  public markNumber(): Number {
    if (!this.isNumberOpen()) {
      return;
    }
    this.state = NumberState.Marked;
    return this;
  }

  public skipNumber(): Number {
    if (!this.isNumberOpen()) {
      return this;
    }
    this.state = NumberState.Skipped;
    return this;
  }

  public isNumberOpen(): boolean {
    return this.state === NumberState.Open;
  }

  public isNumberMarked(): boolean {
    return this.state === NumberState.Marked;
  }

  public isNumberSkipped(): boolean {
    return this.state === NumberState.Skipped;
  }
}
