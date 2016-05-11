import Board from '../logics/Board';
import _Number from '../logics/Number';
import Row from '../logics/Row';

export function Ascending(color): Row {
  const row = new Row();
  for (let numberLabel = 2; numberLabel <= 12; ++numberLabel) {
    row.push(new _Number(color, numberLabel));
  }
  return row;
}

export function Descending(color): Row {
  const row = new Row();
  for (let numberLabel = 12; numberLabel >= 2; --numberLabel) {
    row.push(new _Number(color, numberLabel));
  }
  return row;
}

export default function classic(board: Board): Board {
  board.setRows([Ascending('red'), Ascending('yellow'), Descending('green'), Descending('blue')]);
  board.setFails(4);
  return board;
}
