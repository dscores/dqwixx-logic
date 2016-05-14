import Board from '../logics/Board';
import _Number from '../logics/Number';
import Row from '../logics/Row';

function red(): Row {
  return new Row().setNumbers([
    new _Number('yellow', 2),
    new _Number('yellow', 3),
    new _Number('yellow', 4),
    new _Number('blue', 5),
    new _Number('blue', 6),
    new _Number('blue', 7),
    new _Number('green', 8),
    new _Number('green', 9),
    new _Number('green', 10),
    new _Number('red', 11),
    new _Number('red', 12)
  ]);
}

function yellow(): Row {
  return new Row().setNumbers([
    new _Number('red', 2),
    new _Number('red', 3),
    new _Number('green', 4),
    new _Number('green', 5),
    new _Number('green', 6),
    new _Number('green', 7),
    new _Number('blue', 8),
    new _Number('blue', 9),
    new _Number('yellow', 10),
    new _Number('yellow', 11),
    new _Number('yellow', 12)
  ]);
}

function green(): Row {
  return new Row().setNumbers([
    new _Number('blue', 12),
    new _Number('blue', 11),
    new _Number('blue', 10),
    new _Number('yellow', 9),
    new _Number('yellow', 8),
    new _Number('yellow', 7),
    new _Number('red', 6),
    new _Number('red', 5),
    new _Number('red', 4),
    new _Number('green', 3),
    new _Number('green', 2)
  ]);
}

function blue(): Row {
  return new Row().setNumbers([
    new _Number('green', 12),
    new _Number('green', 11),
    new _Number('red', 10),
    new _Number('red', 9),
    new _Number('red', 8),
    new _Number('red', 7),
    new _Number('yellow', 6),
    new _Number('yellow', 5),
    new _Number('blue', 4),
    new _Number('blue', 3),
    new _Number('blue', 2)
  ]);
}

export default function mixedColors(board: Board): Board {
  return board
    .setRows([red(), yellow(), green(), blue()])
    .setFails(4);
}
