import { TbMathFunction } from 'react-icons/tb';
import { Algorithms } from '../utils/interfaces';
import ActionButton from './ActionButton';

interface AlgorithmsPanelProps {
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<Algorithms>>;
  selectedAlgorithm: Algorithms;
}

const AlgorithmsPanel = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
}: AlgorithmsPanelProps) => {
  const algorithms: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];

  return (
    <>
      <div className='hidden md:flex items-center mb-3'>
        <TbMathFunction className='text-gray-100 mr-1 text-2xl' />
        <h3 className='text-xl text-gray-100 font-medium'>Algorithms</h3>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-1 w-full '>
        {algorithms.map((algo) => (
          <ActionButton
            action={() => setSelectedAlgorithm(algo)}
            hoverColor='zinc-800'
            textColor='gray-100'
            disabled={algo === selectedAlgorithm}
            disabledColor='zinc-700'
            text={algo.charAt(0).toUpperCase() + algo.slice(1)}
            key={algo}
          />
        ))}
      </div>
    </>
  );
};

export default AlgorithmsPanel;
