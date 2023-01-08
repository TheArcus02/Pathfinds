import { TbMathFunction } from 'react-icons/tb';
import { RiToolsFill } from 'react-icons/ri';
import { VscRunAll } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import { FaRegHourglass, FaEraser, FaWeightHanging } from 'react-icons/fa';
import { MdClearAll } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';

interface IConfigMenu {
  callAlgorithm: () => void;
  clearBoard: () => void;
  clearPath: () => void;
  canRun: boolean;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  callAlgorithm,
  clearBoard,
  clearPath,
  canRun,
}) => {
  const selectedAlgo = 'dijkstra';
  const selectedTool = 'wall';

  return (
    <div className='py-7 px-4 bg-zinc-900 w-full flex justify-center'>
      <div className='grid grid-cols-3 w-full max-w-screen-2xl'>
        <div className='border-r-2 border-dotted border-gray-400 px-2'>
          <div className='flex items-center mb-3 '>
            <TbMathFunction className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Algorithms</h3>
          </div>
          <div className='grid grid-cols-3 w-full'>
            {/* TODO map over avaliable algorithms */}
            <button
              type='button'
              className={`text-gray-100 ease-in duration-150 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                selectedAlgo === 'dijkstra'
                  ? 'bg-sky-500   hover:cursor-default'
                  : 'bg-sky-700 hover:bg-sky-600'
              }`}
            >
              Dijskstra
            </button>
            <button
              type='button'
              className={`text-gray-100 ease-in duration-150 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                selectedAlgo === 'astar'
                  ? 'bg-sky-500 hover:cursor-default'
                  : 'bg-sky-700 hover:bg-sky-600'
              }`}
            >
              Astar
            </button>
            <button
              type='button'
              className={`text-gray-100 ease-in duration-150 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                selectedAlgo === 'dfs'
                  ? 'bg-sky-500 hover:cursor-default'
                  : 'bg-sky-700 hover:bg-sky-600'
              }`}
            >
              DFS
            </button>
            <button
              type='button'
              className={`text-gray-100 ease-in duration-150 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
                selectedAlgo === 'bfs'
                  ? 'bg-sky-500 hover:cursor-default'
                  : 'bg-sky-700 hover:bg-sky-600'
              }`}
            >
              BFS
            </button>
          </div>
        </div>
        <div className='border-r-2 border-dotted border-gray-400 px-6'>
          <div className='flex items-center mb-3'>
            <RiToolsFill className='text-gray-100 mr-1 text-2xl' />
            <h3 className='text-xl text-gray-100 font-medium'>Tools</h3>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <div
              className={`flex items-center gap-2 ease-in duration-150 text-gray-100 text-sm font-medium px-5 py-2.5 rounded-lg ${
                selectedTool === 'wall'
                  ? 'bg-zinc-700'
                  : 'hover:bg-zinc-800 hover:cursor-pointer'
              }`}
            >
              <GiBrickWall size='23px' className='text-gray-100' />
              Walls
            </div>
            <div
              className={`flex items-center gap-2 ease-in duration-150 text-gray-100 text-sm font-medium px-5 py-2.5 rounded-lg ${
                selectedTool === 'weight'
                  ? 'bg-zinc-700'
                  : 'hover:bg-zinc-800 hover:cursor-pointer'
              }`}
            >
              <FaWeightHanging size='23px' className='text-gray-100' />
              Weight
            </div>
            <div
              className={`flex items-center gap-2 ease-in duration-150 text-gray-100 text-sm font-medium px-5 py-2.5 rounded-lg ${
                selectedTool === 'eraser'
                  ? 'bg-zinc-700'
                  : 'hover:bg-zinc-800 hover:cursor-pointer'
              }`}
            >
              <FaEraser size='23px' className='text-gray-100' />
              Eraser
            </div>
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
              onClick={() => callAlgorithm()}
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
