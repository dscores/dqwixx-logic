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

  public getLabel(): number {
    return this.label;
  }

  public markNumber(): string {
    if (!this.isNumberOpen()) {
      return;
    }
    this.state = NumberState.Marked;
    return this.getColor();
  }

  public skipNumber() {
    if (!this.isNumberOpen()) {
      return;
    }
    this.state = NumberState.Skipped;
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
