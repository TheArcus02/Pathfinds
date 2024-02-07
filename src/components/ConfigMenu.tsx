import { useState } from 'react';
import { Algorithms, Tools } from '../utils/interfaces';
import AlgorithmsPanel from './AlgorithmsPanel';
import ToolsPanel from './ToolsPanel';
import ActionsPanel from './ActionsPanel';

interface IConfigMenu {
  selectedTool: Tools;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  selectedTool,
  setSelectedTool,
  weight,
  setWeight,
  animationSpeed,
  setAnimationSpeed,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithms>('dijkstra');
  return (
    <div className='py-3 md:py-4 px-1 md:px-4 bg-zinc-900 w-full flex justify-center'>
      <div className='grid grid-cols-3 w-full max-w-screen-2xl'>
        <div className='border-r-2 border-dotted border-gray-400 px-1 md:px-2'>
          <AlgorithmsPanel
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
        </div>
        <div className='border-r-2 border-dotted border-gray-400 px-1 md:px-6'>
          <ToolsPanel
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            setWeight={setWeight}
            weight={weight}
          />
        </div>
        <div className='px-6'>
          <ActionsPanel selectedAlgorithm={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
};

export default ConfigMenu;
