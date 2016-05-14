import Board from '../logics/Board';
import Number from '../logics/Number';
import _Number from '../logics/Number';
import Row from '../logics/Row';

export function Ascending(color: string): Row {
  const numbers: Number[] = [];
  for (let numberLabel: number = 2; numberLabel <= 12; ++numberLabel) {
    numbers.push(new _Number(color, numberLabel));
  }
  return new Row().setNumbers(numbers);
}

export function Descending(color: string): Row {
  const numbers: Number[] = [];
  for (let numberLabel: number = 12; numberLabel >= 2; --numberLabel) {
    numbers.push(new _Number(color, numberLabel));
  }
  return new Row().setNumbers(numbers);
}

export default function classic(board: Board): Board {
  return board
    .setRows([Ascending('red'), Ascending('yellow'), Descending('green'), Descending('blue')])
    .setFails(4);
}
