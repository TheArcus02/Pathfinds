interface IConfigMenu {
  callAlgorithm: () => void;
}

const ConfigMenu: React.FC<IConfigMenu> = ({ callAlgorithm }) => {
  return (
    <div className='w-64 p-7 bg-zinc-800'>
      <h2 className='text-2xl text-center font-bold text-green-400'>
        Config Menu
      </h2>
      <div className='flex flex-col items-center py-4'>
        <button
          type='button'
          className='text-black bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none '
          onClick={() => callAlgorithm()}
        >
          Run Algorithm
        </button>
      </div>
    </div>
  );
};

export default ConfigMenu;
