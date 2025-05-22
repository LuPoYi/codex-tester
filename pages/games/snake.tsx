import { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';

const cellSize = 20;
const width = 20;
const height = 20;

interface Point {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') setDirection({ x: 0, y: -1 });
      if (e.key === 'ArrowDown') setDirection({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft') setDirection({ x: -1, y: 0 });
      if (e.key === 'ArrowRight') setDirection({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((s) => {
        const head = s[0];
        const newHead = {
          x: (head.x + direction.x + width) % width,
          y: (head.y + direction.y + height) % height,
        };
        return [newHead];
      });
    }, 200);
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width * cellSize, height * cellSize);
    ctx.fillStyle = 'green';
    snake.forEach((part) => {
      ctx.fillRect(part.x * cellSize, part.y * cellSize, cellSize, cellSize);
    });
  }, [snake]);

  return (
    <Layout>
      <h1>Lonely Snake</h1>
      <canvas
        ref={canvasRef}
        width={width * cellSize}
        height={height * cellSize}
        style={{ border: '1px solid #000' }}
      />
      <p>No food to eat, just keep moving!</p>
    </Layout>
  );
}
