import * as e from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { DriveCom } from '@src/other/classes';

// **** Functions **** //

async function driveCommand(req: e.Request, res: e.Response) {
  // FIXME: Should tell the robot what it should do, might be a function call
  console.log(req.body)
  var tmp = req.body["com"] as DriveCom
  return res.status(HttpStatusCodes.OK).json({ tmp });
}


// **** Export default **** //

export default {
  drive: driveCommand,
} as const;
