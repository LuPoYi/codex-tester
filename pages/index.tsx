import Head from 'next/head';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Simple Todo app with Next.js" />
      </Head>
      <main>
        <TodoList />
      </main>
    </div>
  );
}
