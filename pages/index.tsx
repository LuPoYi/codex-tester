import Head from 'next/head';
import TodoList from '../components/TodoList';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Simple Todo app with Next.js" />
      </Head>
      <TodoList />
    </Layout>
  );
}
