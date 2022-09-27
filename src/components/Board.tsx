import { useEffect, useState } from 'react';

const Board = () => {
  const [nodes, setNodes] = useState<Array<[][][]>>([]);
  const [cols, setCols] = useState(60);
  const [rows, setRows] = useState(50);
  useEffect(() => {
    const tempNodes = [];
    for (let row = 0; row < 60; row += 1) {
      const currRow = [];
      for (let col = 0; col < 50; col += 1) {
        currRow.push([]);
      }
      tempNodes.push(currRow);
    }
    setNodes(tempNodes);
  }, [cols, rows]);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-[repeat(50,_minmax(0,_1fr))] min-h-full'>
        {nodes.map((row) =>
          row.map((node) => (
            <div className='border border-solid border-slate-500 p-2' />
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
