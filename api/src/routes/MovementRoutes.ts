import * as e from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DriveCom, EventTypes, GrabCom } from '@src/other/classes';
import communication from '@src/robot/communication'


// If the robot is in automatic mode or manual 
let autoMode = false;


// **** Functions **** //

async function driveCommand(req: e.Request, res: e.Response) {
  // Blocks the command if the robot is in auto mode
  if (autoMode){
    return res.status(HttpStatusCodes.BAD_REQUEST).json("The robot is set to automatic mode, cannot control it manually.");
  }

  var command = req.body["com"] as DriveCom
  
  console.log(EventTypes.Drive, command)

  communication.sseSendMessage(EventTypes.Drive, command)

  return res.status(HttpStatusCodes.OK).json({ tmp: command });
}

async function switchControl(req: e.Request, res: e.Response) {
  // as the value is named auto the expected value to get is true or false
  var modeSwitchedTo = req.body["auto"] as boolean

  // Check that the controls is not switched to the same mode
  if (modeSwitchedTo === autoMode){
    return res.status(HttpStatusCodes.BAD_REQUEST).json("Cannot switch to same control mode.");
  }

  // Update the control mode
  autoMode = modeSwitchedTo

  console.log(EventTypes.SwitchControl, modeSwitchedTo)

  communication.sseSendMessage(EventTypes.SwitchControl, modeSwitchedTo)

  return res.status(HttpStatusCodes.OK).json({ tmp: modeSwitchedTo });
}

async function grabCommand(req: e.Request, res: e.Response) {
  // Blocks the command if the robot is in auto mode
  if (autoMode){
    return res.status(HttpStatusCodes.BAD_REQUEST).json("The robot is set to automatic mode, cannot control it manually.");
  }

  var command = req.body["grab"] as GrabCom
  
  console.log(EventTypes.Grab, command)

  communication.sseSendMessage(EventTypes.Grab, +command)

  return res.status(HttpStatusCodes.OK).json({ tmp: command });
}


// **** Export default **** //

export default {
  drive: driveCommand,
  control: switchControl,
  grab: grabCommand
} as const;
