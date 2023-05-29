import "./App.css";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

function App() {
  const [text, setText] = useState("");
  const [gripperStatus, setGripperStatus] = useState(0)
  const [controlStatus, setControlStatus] = useState(0)

  const movementEndpoint = "http://localhost:3000/api/move/drive";

  const gripEndpoint = "http://localhost:3000/api/move/grab";

  const changeControlEndpoint = "http://localhost:3000/api/control";


  var driveForward = {
    com: 1,
  };

  var driveBackwards = {
    com: -1,
  };

  var driveStop = {
    com: 0,
  };

  var rotateClockwise = {
    com: 2,
  };

  var rotateCounterClockwise = {
    com: -2,
  };

  var enableManualControl = {
    "auto": false
}

  var enableAutonomousControl = {
    "auto": true
  }

  var openGrip = {
    "grab": true
}
  var closeGrip = {
    "grab": false
  }

  function handleArrowUpOnClick() {
    console.log("Moving Forward");
    setText("Moving Forward");

    fetch(
      { movementEndpoint },
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(driveForward),
      }
    );
  }

  function handleArrowDownOnClick() {
    console.log("Moving Backwards");
    setText("Moving Backwards");

    fetch(movementEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(driveBackwards),
    });
  }

  function handleReleaseOfButton() {
    fetch(movementEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(driveStop),
    });
  }

  function handleLeftRotateOnClick() {
    console.log("Rotating left");
    setText("Rotating left");

    fetch(movementEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(rotateCounterClockwise),
    });
  }

  function handleRightRotateOnClick() {
    console.log("Rotating left");
    setText("Rotating right");

    fetch(movementEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(rotateClockwise),
    });
  }

  
  function handleGripOnClick() {

    setGripperStatus(prev => 1 - prev)
    if (gripperStatus === 0) {
      handleOpenGripOnClick()
    }
    else {
      handleCloseGripOnClick()
    }
  }


  function handleOpenGripOnClick() {
    console.log("Opening Grip");
    setText("Opening Grip");
    

    fetch(gripEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(openGrip),
    });
  }

  function handleCloseGripOnClick() {
    console.log("Closing Grip");
    setText("Closing Grip");

    fetch(gripEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(closeGrip),
    });
  }

  function handleControlOnClick() {
    setControlStatus(prev => 1 - prev)
    if (controlStatus === 0) {
      handleEnableManualControlOnClick()
    }
    else {
      handleEnableAutonomousControlOnClick()
    }
  }

  function handleEnableAutonomousControlOnClick() {
    console.log("Changing control");

    fetch(changeControlEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(enableAutonomousControl),
    });
  }
  function handleEnableManualControlOnClick() {
    console.log("Changing control");

    fetch(changeControlEndpoint, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(enableManualControl),
    });
  }

  return (
    <div className="h-screen bg-gray-300 overflow-x-hidden overflow-y-hidden">
      <h1 className="font-mono text-9xl translate-x-[-50%] left-[50%] absolute pt-10">
        HelperBot
      </h1>
      <div className=" pt-28">
        <div className="flex flex-row justify-center pt-40 gap-[50%]">
          <div className="flex flex-col gap-10">
            <ArrowUpwardIcon
              onMouseDown={handleArrowUpOnClick}
              onMouseUp={handleReleaseOfButton}
              style={{ color: "white" }}
              sx={{ fontSize: 200 }}
              className="cursor-pointer bg-black"
            />
            <ArrowDownwardIcon
              onMouseDown={handleArrowDownOnClick}
              onMouseUp={handleReleaseOfButton}
              style={{ color: "white" }}
              sx={{ fontSize: 200 }}
              className="cursor-pointer bg-black"
            />
          </div>
          <div className="flex flex-row gap-[50px]">
            <RotateLeftIcon
              onClick={handleLeftRotateOnClick}
              style={{ color: "white" }}
              sx={{ fontSize: 200 }}
              className="cursor-pointer bg-black self-center "
            />
            <RotateRightIcon
              onClick={handleRightRotateOnClick}
              style={{ color: "white" }}
              sx={{ fontSize: 200 }}
              className="cursor-pointer bg-black self-center "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-center w-full">
        <div className="text-center font-mono text-3xl">
          {text}
        </div>
        <div className="flex justify-center">
          <button onClick={handleGripOnClick} className="bg-black text-white text-center font-mono w-fit p-4 text-4xl">
            {gripperStatus ? "Close Grip": "Open Grip"}
          </button>
        </div>
        <div className="flex justify-center">
          <button onClick={handleControlOnClick} className="bg-black text-white font-mono text-center w-fit p-4 text-4xl">
            {controlStatus ? "Click to enable autonomous control" : "Click to enable manual control"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
