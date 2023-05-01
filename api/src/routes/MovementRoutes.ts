import * as e from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DriveCom } from '@src/other/classes';
import communication from '@src/robot/communication'

// **** Functions **** //

async function driveCommand(req: e.Request, res: e.Response) {

  // Get 
  var command: DriveCom = req.body["com"] 

  // communication.wsSendMessage(command);
  communication.sseSendMessage(command);

  // TODO: Remove tmp return value
  return res.status(HttpStatusCodes.OK).json({ tmp: command });
}


// **** Export default **** //

export default {
  drive: driveCommand,
} as const;
