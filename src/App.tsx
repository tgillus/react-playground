import { Option } from 'effect';
import { Match } from 'effect';
import { constVoid } from 'effect/Function';
import { useState } from 'react';

type XOrO = 'X' | 'O';
type SquareValue = Option.Option<XOrO>;

interface SquareProps {
  readonly value: SquareValue;
  readonly onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick} type="button">
      {Option.getOrNull(value)}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<readonly SquareValue[]>(
    Array(9).fill(Option.none())
  );

  function handleClick(i: number) {
    Option.match(squares[i], {
      onNone: () => {
        const nextSquares = [...squares];
        nextSquares[i] = Option.some(
          Match.value(xIsNext).pipe(
            Match.when(true, () => 'X' as const),
            Match.orElse(() => 'O' as const)
          )
        );
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      },
      onSome: constVoid,
    });
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
