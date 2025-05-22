import { useState } from 'react';
import Layout from '../../components/Layout';

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my computer I needed a break, and it said 'No problem – I'll go to sleep.'",
  "Why did the web developer leave the restaurant? Because of the table layout." 
];

export default function JokeGame() {
  const [joke, setJoke] = useState('');

  const tellJoke = () => {
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(random);
  };

  return (
    <Layout>
      <h1>Joke Game</h1>
      <button onClick={tellJoke}>Tell me a joke</button>
      {joke && <p>{joke}</p>}
    </Layout>
  );
}
