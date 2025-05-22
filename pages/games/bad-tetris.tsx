import { useEffect, useState, useRef } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/BadTetris.module.css';

interface Cell {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

interface Piece {
  cells: Cell[];
  x: number;
  y: number;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 24;

// Generate a purposely broken piece
function createPiece(): Piece {
  const shapes = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 1 }, // gap to make it not fit
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }, // weird L shape
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 }, // heavy on one side
    ],
  ];
  const base = shapes[Math.floor(Math.random() * shapes.length)];
  const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  const cells: Cell[] = base.map((c) => ({
    x: c.x,
    y: c.y,
    offsetX: Math.floor(Math.random() * 6 - 3),
    offsetY: Math.floor(Math.random() * 6 - 3),
    color,
  }));
  return { cells, x: 4, y: 0 };
}

export default function BadTetris() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [piece, setPiece] = useState<Piece | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    spawnPiece();
    intervalRef.current = setInterval(() => {
      setPiece((p) => {
        if (!p) return p;
        if (p.y >= BOARD_HEIGHT - 2) {
          // stick the piece and spawn a new one
          setCells((old) => [...old, ...translateCells(p)]);
          spawnPiece();
          return null;
        }
        return { ...p, y: p.y + 1 };
      });
    }, 800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const spawnPiece = () => {
    setPiece(createPiece());
  };

  const translateCells = (p: Piece) => {
    return p.cells.map((c) => ({
      ...c,
      x: c.x + p.x,
      y: c.y + p.y,
    }));
  };

  const move = (dir: number) => {
    setPiece((p) => {
      if (!p) return p;
      const newX = p.x + dir;
      if (newX < 0 || newX > BOARD_WIDTH - 3) return p;
      return { ...p, x: newX };
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const allCells = [...cells, ...(piece ? translateCells(piece) : [])];

  return (
    <Layout>
      <h1>Broken Tetris</h1>
      <p>Pieces never quite line up. Move with left/right arrows.</p>
      <div
        className={styles.board}
        style={{
          width: BOARD_WIDTH * CELL_SIZE,
          height: BOARD_HEIGHT * CELL_SIZE,
        }}
      >
        {allCells.map((c, idx) => (
          <div
            key={idx}
            className={styles.cell}
            style={{
              left: c.x * CELL_SIZE + c.offsetX,
              top: c.y * CELL_SIZE + c.offsetY,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: c.color,
            }}
          />
        ))}
      </div>
    </Layout>
  );
}
