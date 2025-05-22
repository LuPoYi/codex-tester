import Link from 'next/link';
import Layout from '../../components/Layout';

export default function GamesPage() {
  return (
    <Layout>
      <h1>Games</h1>
      <ul>
        <li>
          <Link href="/games/joke">Joke Game</Link>
        </li>
        <li>
          <Link href="/games/bad-tetris">Broken Tetris</Link>
        </li>
      </ul>
    </Layout>
  );
}
