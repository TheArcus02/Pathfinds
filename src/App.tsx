import './App.css';
import Board from './components/Board';
import ConfigMenu from './components/ConfigMenu';

const App = () => {
  return (
    <div className='bg-zinc-700 min-h-screen flex w-full'>
      <ConfigMenu />
      <Board />
    </div>
  );
};

export default App;
