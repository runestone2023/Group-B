import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import MovementRoutes from './MovementRoutes';
import { isDriveCom } from './InputValidation';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add MovementRouter ** //

const movementRouter = Router();

// ** Create endpoints ** //
movementRouter.post(
  Paths.Movement.Drive,
  // Expects a command (com) that is in the type Drive
  validate(['com', isDriveCom]),
  MovementRoutes.drive
)

// ** Add Route to base ** //
// Add endpoint to app with added base path
apiRouter.use(Paths.Movement.Base, movementRouter);

// **** Export default **** //

export default apiRouter;
