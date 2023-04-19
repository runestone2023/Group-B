/** 
 * Input validation functions
*/
import { DriveCom } from "@src/other/classes";

// Check if object is a drive command
export function isDriveCom(arg: unknown): arg is DriveCom {
    return (arg as DriveCom) in DriveCom
}