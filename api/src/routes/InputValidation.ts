/** 
 * Input validation functions
*/
import { DriveCom } from "@src/other/classes";

// Check if object is a valid drive command
export function validDriveCom(arg: unknown): arg is DriveCom {
    return (arg as DriveCom) in DriveCom
}

// Check if object is valid control switch 
export function validControl(arg: unknown): arg is boolean {
    return typeof arg === 'boolean'
}