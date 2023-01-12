import { TbMathFunction } from 'react-icons/tb';
import { RiToolsFill } from 'react-icons/ri';
import { VscRunAll } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import { FaRegHourglass, FaEraser, FaWeightHanging } from 'react-icons/fa';
import { MdClearAll } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import { useState } from 'react';
import { Algorithms, Tools } from '../utils/interfaces';

interface IConfigMenu {
  callAlgorithm: (algorithm: Algorithms) => void;
  clearBoard: () => void;
  clearPath: () => void;
  canRun: boolean;
  selectedTool: Tools;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools>>;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  callAlgorithm,
  clearBoard,
  clearPath,
  canRun,
  selectedTool,
  setSelectedTool,
}) => {
  const algorithms: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];
  const tools: Tools[] = ['Walls', 'Weight', 'Eraser'];

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithms>('dijkstra');

  const getToolIcon = (tool: Tools) => {
    if (tool === 'Walls')
      return <GiBrickWall size='23px' className='text-gray-100' />;
    if (tool === 'Weight')
      return <FaWeightHanging size='23px' className='text-gray-100' />;
    if (tool === 'Eraser')
      return <FaEraser size='23px' className='text-gray-100' />;
    return undefined;
  };

  return (
    <div className='py-7 px-4 bg-zinc-900 w-full flex justify-center'>
      <div className='grid grid-cols-3 w-full max-w-screen-2xl'>
        <div className='border-r-2 border-dotted border-gray-400 px-2'>
          <div className='flex items-center mb-3 '>
            <TbMathFunction className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Algorithms</h3>
          </div>
          <div className='grid grid-cols-3 w-full'>
            {algorithms.map((algo) => (
              <button
                type='button'
                className={`text-gray-100 ease-in duration-150 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                  selectedAlgorithm === algo
                    ? 'bg-sky-500   hover:cursor-default'
                    : 'bg-sky-700 hover:bg-sky-600'
                }`}
                disabled={algo === selectedAlgorithm}
                onClick={() => setSelectedAlgorithm(algo)}
                key={algo}
              >
                {algo.charAt(0).toUpperCase() + algo.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className='border-r-2 border-dotted border-gray-400 px-6'>
          <div className='flex items-center mb-3'>
            <RiToolsFill className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Tools</h3>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {tools.map((tool) => (
              <button
                type='button'
                className={`flex items-center gap-2 ease-in duration-150 text-gray-100 text-sm font-medium px-5 py-2.5 rounded-lg ${
                  selectedTool === tool
                    ? 'bg-zinc-700'
                    : 'hover:bg-zinc-800 hover:cursor-pointer'
                }`}
                disabled={tool === selectedTool}
                onClick={() => setSelectedTool(tool)}
                key={tool}
              >
                {getToolIcon(tool)}
                {tool.charAt(0).toUpperCase() + tool.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className='px-6'>
          <div className='flex items-center mb-3'>
            <FaRegHourglass className='text-gray-100 mr-1 text-xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Actions</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              disabled={!canRun}
              className={`text-black bg-zinc-200 ease-in duration-150  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                canRun ? 'hover:bg-green-400' : 'bg-gray-400'
              }`}
              onClick={() => callAlgorithm(selectedAlgorithm)}
            >
              <div className='flex items-center'>
                <VscRunAll className='text-lg mr-1' />
                Run
              </div>
            </button>
            <button
              type='button'
              className='text-black bg-zinc-200 ease-in duration-150 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none '
              onClick={() => clearPath()}
            >
              <div className='flex items-center'>
                <AiOutlineClear className='text-lg mr-1' />
                Clear Path
              </div>
            </button>
            <button
              type='button'
              className='text-black bg-zinc-200 ease-in duration-150 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none '
              onClick={() => clearBoard()}
            >
              <div className='flex items-center'>
                <MdClearAll className='text-lg mr-1' />
                Clear Board
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigMenu;
