enum FailState {
  Open = 1,
  Failed
}

export default class Fail {
  private state: FailState = FailState.Open;

  public failFail() {
    if (!this.isFailOpen()) {
      return;
    }
    this.state = FailState.Failed;
  }

  public isFailOpen(): boolean {
    return this.state === FailState.Open;
  }

  public isFailFailed(): boolean {
    return this.state === FailState.Failed;
  }
}