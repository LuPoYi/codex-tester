import { useState } from 'react';
import Layout from '../../components/Layout';

export default function MinefieldGame() {
  const size = 5;
  const [revealed, setRevealed] = useState(
    Array.from({ length: size }, () => Array(size).fill(false))
  );
  const [gameOver, setGameOver] = useState(false);

  const clickCell = () => {
    setGameOver(true);
    setRevealed(Array.from({ length: size }, () => Array(size).fill(true)));
  };

  return (
    <Layout>
      <h1>All Mines Minesweeper</h1>
      <div style={{ display: 'inline-block' }}>
        {revealed.map((row, rIdx) => (
          <div key={rIdx} style={{ display: 'flex' }}>
            {row.map((cell, cIdx) => (
              <button
                key={cIdx}
                onClick={clickCell}
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '2px',
                  fontSize: '20px',
                }}
              >
                {cell ? '💣' : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <p>You clicked on a mine! Game over.</p>}
    </Layout>
  );
}
