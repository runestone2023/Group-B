/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Movement: {
    Base: '/move',
    Drive: '/drive'
  },
  Control: {
    Base: '/control'
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
