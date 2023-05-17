import * as e from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DriveCom } from '@src/other/classes';
import communication from '@src/robot/communication'


// If the robot is in automatic mode or manual 
let autoMode = false;


// **** Functions **** //

async function driveCommand(req: e.Request, res: e.Response) {
  // Blocks the command if the robot is in auto mode
  if (autoMode){
    return res.status(HttpStatusCodes.BAD_REQUEST).json("The robot is set to automatic mode, cannot control it manually.");
  }

  // FIXME: Should tell the robot what it should do, might be a function call
  console.log(req.body)

  var tmp = req.body["com"] as DriveCom

  return res.status(HttpStatusCodes.OK).json({ tmp });
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

    // FIXME: Should tell the robot what it should do, might be a function call
    console.log(req.body)

  return res.status(HttpStatusCodes.OK).json({ tmp: modeSwitchedTo });
}


// **** Export default **** //

export default {
  drive: driveCommand,
  control: switchControl,
} as const;
