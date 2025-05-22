import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Fun Zone</h2>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/games">Games</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
