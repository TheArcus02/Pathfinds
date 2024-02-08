import { useDispatch, useSelector } from 'react-redux';
import { RiToolsFill } from 'react-icons/ri';
import { GiBrickWall } from 'react-icons/gi';
import { FaEraser, FaWeightHanging } from 'react-icons/fa';
import ActionButton from './ActionButton';
import { Tools } from '../utils/interfaces';
import { AppDispatch, RootState } from '../redux/store';
import {
  changeAnimationSpeed,
  changeCurrentWeight,
  changeSelectedTool,
  decrementWeight,
  incrementWeight,
} from '../redux/toolsSlice';

const ToolsPanel = () => {
  const tools: Tools[] = ['Walls', 'Weight', 'Eraser'];

  const loading = useSelector((state: RootState) => state.nodes.loading);
  const selectedTool = useSelector(
    (state: RootState) => state.tools.selectedTool
  );
  const animationSpeed = useSelector(
    (state: RootState) => state.tools.animationSpeed
  );
  const weight = useSelector((state: RootState) => state.tools.currentWeight);

  const dispatch = useDispatch<AppDispatch>();

  const getToolIcon = (tool: Tools) => {
    if (tool === 'Walls') return GiBrickWall;
    if (tool === 'Weight') return FaWeightHanging;
    if (tool === 'Eraser') return FaEraser;
    return undefined;
  };

  return (
    <>
      <div className='hidden md:flex items-center mb-3'>
        <RiToolsFill className='text-gray-100 mr-1 text-2xl' />
        <h3 className='text-xl text-gray-100 font-medium'>Tools</h3>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {tools.map((tool) => (
          <ActionButton
            disabledColor={selectedTool === tool ? 'zinc-700' : undefined}
            hoverColor='zinc-800'
            textColor='gray-100'
            Icon={getToolIcon(tool)}
            iconSize='23px'
            iconColor='gray-100'
            action={() => dispatch(changeSelectedTool(tool))}
            text={tool.charAt(0).toUpperCase() + tool.slice(1)}
            disabled={loading || selectedTool === tool}
            HideTextOnSm
            key={tool}
          />
        ))}
        <div className='custom-number-input'>
          <div className='hidden md:block w-full text-gray-100 text-sm font-semibold mb-1'>
            Set Weight
          </div>
          <div className='flex items-center gap-2'>
            <div>
              <FaWeightHanging size='23px' className='text-gray-100' />
            </div>
            <div className='flex flex-row w-1 md:w-20 rounded-lg'>
              <button
                type='button'
                onClick={() => dispatch(decrementWeight())}
                className=' bg-zinc-700 text-gray-100 hover:text-gray-200 hover:bg-zinc-600 h-full px-1 rounded-l cursor-pointer outline-none'
              >
                <span className='m-auto text-2xl font-thin'>−</span>
              </button>
              <input
                type='number'
                id='custom-input-number'
                className='text-center min-w-[15px] w-full bg-zinc-500 font-semibold text-md hover:text-gray-300 focus:text-gray-100  md:text-basecursor-default flex items-center text-gray-100  outline-none'
                name='custom-input-number'
                value={weight}
                onChange={(e) =>
                  dispatch(changeCurrentWeight(parseInt(e.target.value, 10)))
                }
              />
              <button
                type='button'
                onClick={() => dispatch(incrementWeight())}
                className='bg-zinc-700 text-gray-100 hover:text-gray-200 hover:bg-zinc-600 h-full px-1 rounded-r cursor-pointer'
              >
                <span className='m-auto text-2xl font-thin'>+</span>
              </button>
            </div>
          </div>
        </div>
        <div className='col-span-3 md:col-span-2'>
          <div className='w-full text-gray-100 text-sm font-semibold mb-1'>
            Animation Speed
          </div>
          <div>
            <div className='flex justify-between text-gray-100 text-sm'>
              <div>Fast</div>
              <div>Slow</div>
            </div>
            <input
              type='range'
              min='1'
              max='100'
              value={animationSpeed}
              onChange={(e) =>
                dispatch(
                  changeAnimationSpeed(Math.abs(parseInt(e.target.value, 10)))
                )
              }
              className='w-full'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsPanel;
