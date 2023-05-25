/** 
 * Input validation functions
*/
import { DriveCom, GrabCom } from "@src/other/classes";

// Check if object is a drive command
export function isDriveCom(arg: unknown): arg is DriveCom {
  return (arg as DriveCom) in DriveCom
}

// Check if object is a valid drive command
export function validDriveCom(arg: unknown): arg is DriveCom {
  return (arg as DriveCom) in DriveCom
}

// Check if object is valid control switch 
export function validControl(arg: unknown): arg is boolean {
  return (typeof arg) === 'boolean'
}

// Check if object is valid grab command
export function validGrabCom(arg: unknown): arg is GrabCom {
  console.log(arg)
  return (+ (arg as GrabCom)) in GrabCom
}