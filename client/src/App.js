import './App.css';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';


function App() {
  const [text, setText] = useState("");
  
  const endpoint = "http://localhost:3000/api/move/drive"

  var driveForward = {
    "com": 1,
  }
  
  var driveBackwards = {
    "com": -1,
  }

  var driveStop = {
    "com": 0,
  }

  var rotateClockwise = {
    "com": 2,
  }

  var rotateCounterClockwise = {
    "com": -2,
  }

  function handleArrowUpOnClick() {
    console.log("Moving Forward");
    setText("Moving Forward")

      fetch({endpoint}, { 
  
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(driveForward) 
      })
  }

  function handleArrowDownOnClick() {
    console.log("Moving Backwards");
    setText("Moving Backwards")

    fetch(endpoint, { 
  
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(driveBackwards)
    })
  }

  function handleReleaseOfButton() {
    fetch(endpoint, {
  
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(driveStop)
    })
  }

  function handleLeftRotateOnClick() {
    console.log("Rotating left");
    setText("Rotating left")

    fetch(endpoint, {
  
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(rotateCounterClockwise)
    })
  }

  function handleRightRotateOnClick() {
    console.log("Rotating left");
    setText("Rotating right")

    fetch(endpoint, {
  
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(rotateClockwise)
    })
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
                onMouseDown={handleArrowUpOnClick}
                onMouseUp={handleReleaseOfButton}
                style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black' />
              <ArrowDownwardIcon
                onMouseDown={handleArrowDownOnClick}
                onMouseUp={handleReleaseOfButton}
                style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black' />
          </div>
          <div className='flex flex-row gap-[50px]'>
            <RotateLeftIcon onClick={handleLeftRotateOnClick} style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black self-center ' />
            <RotateRightIcon onClick={handleRightRotateOnClick} style ={{color: "white"}} sx={{ fontSize: 300 }} className='cursor-pointer bg-black self-center ' />
          </div>
        </div>
          
        </div>
        <div className='flex justify-center font-mono text-3xl'>
            {text}
        </div>
    </div>
  );
}

export default App;
