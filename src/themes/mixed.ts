import Board from '../logics/Board';
import _Number from '../logics/Number';
import Row from '../logics/Row';

function red(): Row {
  const row = new Row();
  row.push(new _Number('yellow', 2));
  row.push(new _Number('yellow', 3));
  row.push(new _Number('yellow', 4));
  row.push(new _Number('blue', 5));
  row.push(new _Number('blue', 6));
  row.push(new _Number('blue', 7));
  row.push(new _Number('green', 8));
  row.push(new _Number('green', 9));
  row.push(new _Number('green', 10));
  row.push(new _Number('red', 11));
  row.push(new _Number('red', 12));
  return row;
}

function yellow(): Row {
  const row = new Row();
  row.push(new _Number('red', 2));
  row.push(new _Number('red', 3));
  row.push(new _Number('green', 4));
  row.push(new _Number('green', 5));
  row.push(new _Number('green', 6));
  row.push(new _Number('green', 7));
  row.push(new _Number('blue', 8));
  row.push(new _Number('blue', 9));
  row.push(new _Number('yellow', 10));
  row.push(new _Number('yellow', 11));
  row.push(new _Number('yellow', 12));
  return row;
}

function green(): Row {
  const row = new Row();
  row.push(new _Number('blue', 12));
  row.push(new _Number('blue', 11));
  row.push(new _Number('blue', 10));
  row.push(new _Number('yellow', 9));
  row.push(new _Number('yellow', 8));
  row.push(new _Number('yellow', 7));
  row.push(new _Number('red', 6));
  row.push(new _Number('red', 5));
  row.push(new _Number('red', 4));
  row.push(new _Number('green', 3));
  row.push(new _Number('green', 2));
  return row;
}

function blue(): Row {
  const row = new Row();
  row.push(new _Number('green', 12));
  row.push(new _Number('green', 11));
  row.push(new _Number('red', 10));
  row.push(new _Number('red', 9));
  row.push(new _Number('red', 8));
  row.push(new _Number('red', 7));
  row.push(new _Number('yellow', 6));
  row.push(new _Number('yellow', 5));
  row.push(new _Number('blue', 4));
  row.push(new _Number('blue', 3));
  row.push(new _Number('blue', 2));
  return row;
}

export default function mixed(board: Board): Board {
  board.setRows([red(), yellow(), green(), blue()]);
  board.setFails(4);
  return board;
}
