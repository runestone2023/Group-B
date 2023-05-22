/**
 * Miscellaneous shared classes go here.
 */

import HttpStatusCodes from '@src/constants/HttpStatusCodes';


/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: HttpStatusCodes;
  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Possible events
 */

export enum EventTypes{
  Drive = "drive",
  SwitchControl = "switch"
}

/**
 * Classes for movement
 */

// Represents what direction the robot should drive
export enum DriveCom{
  Clockwise = 2,
  Forward = 1,
  Stop = 0,
  Backward = -1,
  CounterClockwise = -2
}
