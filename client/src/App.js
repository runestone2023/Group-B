import './App.css';
import { useState, useRef, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';



function App() {

  const [counter, setCounter] = useState(200);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  // style

  const elementStyle = {
    margin: '5px',
    height: `${counter}px`,
    width: `${counter}px`,
    background: 'black',
  };

  //functions

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 2);
    }, 10);
  };

  const reverseCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 2);
    }, 10);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };


  const [text, setText] = useState("");
  

  const handleArrowUpOnClick = () => {
    console.log("Moving Forward");
    setText("Moving Forward")
  }

  const handleArrowDownOnClick = () => {
    console.log("Moving Backwards");
    setText("Moving Backwards")

  }

  const handleRotateOnClick = () => {
    console.log("Rotating 90 degrees left");
    setText("Rotating 90 degrees left")
  }


  return (
    <div className='h-screen bg-gray-300 overflow-x-hidden overflow-y-hidden'>
      <div className='flex-col'>
        <p className='font-mono text-9xl text-center'>
          Helper Bot
        </p>
        <div className='flex flex-row justify-center pt-40 gap-[50%]'>
          <div className='flex flex-col gap-10'>
              <ArrowUpwardIcon 
                onMouseDown={startCounter}
                onMouseUp={stopCounter}
                onMouseLeave={stopCounter} 
                style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black' />
              <ArrowDownwardIcon
                onMouseDown={reverseCounter}
                onMouseUp={stopCounter}
                onMouseLeave={stopCounter}  
                style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black' />
          </div>
          <RotateLeftIcon onClick={handleRotateOnClick} style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black self-center ' />
        </div>
        <div className='flex justify-center'>
          <div style={elementStyle}>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
