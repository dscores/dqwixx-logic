import Board from '../logics/Board';
import _Number from '../logics/Number';
import Row from '../logics/Row';

function row(color: string, numberLabels: number[]): Row {
  return new Row().setNumbers(numberLabels.map((numberLabel: number) => new _Number(color, numberLabel)));
}

function red(): Row {
  return row('red', [10, 6, 2, 8, 3, 4, 12, 5, 9, 7, 11]);
}

function yellow(): Row {
  return row('yellow', [9, 12, 4, 6, 7, 2, 5, 8, 11, 3, 10]);
}

function green(): Row {
  return row('green', [8, 2, 10, 12, 6, 9, 7, 4, 5, 11, 3]);
}

function blue(): Row {
  return row('blue', [5, 7, 11, 9, 12, 3, 8, 10, 2, 6, 4]);
}

export default function mixedNumbers(board: Board): Board {
  return board
    .setRows([red(), yellow(), green(), blue()])
    .setFails(4);
}
