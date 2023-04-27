import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import MovementRoutes from './MovementRoutes';
import { validControl, validDriveCom } from './InputValidation';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add MovementRouter ** //

const movementRouter = Router();
const controlRouter = Router();

// ** Create endpoints ** //

// *** Endpoints for movement *** //
movementRouter.post(
  Paths.Movement.Drive,
  // Expects a command (com) that is in the type Drive
  validate(['com', validDriveCom]),
  MovementRoutes.drive
)


// *** Endpoints for control *** //
controlRouter.post(
  Paths.Control.Base,
  // Expects a command (com) that is in the type Drive
  validate(['auto', validControl]),
  MovementRoutes.control
)

// ** Add Route to base ** //
// Add endpoint to app with added base path
apiRouter.use(Paths.Movement.Base, movementRouter);

apiRouter.use(controlRouter);

// **** Export default **** //

export default apiRouter;
