import './App.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';




function App() {
  return (
    <div className='h-screen bg-gray-200'>
      <div className='flex-col'>
        <p className='font-mono text-9xl text-center h-fit'>
          Helper Bot
        </p>
        <div className='flex-row'>
          <ArrowUpwardIcon fontSize="xl" className='cursor-pointer' />
          <ArrowDownwardIcon className='cursor-pointer' />
          <RotateLeftIcon className='cursor-pointer' />
        </div>
      </div>  
    </div>
  );
}

export default App;
