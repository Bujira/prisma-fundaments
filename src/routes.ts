import { Router } from "express";
import { ensureClientAuthenticated } from "./middlewares/ensureClientAuthenticated";
import { ensureDeliverymanAuthenticated } from "./middlewares/ensureDeliverymanAuthenticated";
import { AuthenticateClientController } from "./modules/accounts/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { GetAllClientDeliveriesController } from "./modules/clients/useCases/getAllClientDeliveries/GetAllClientDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { GetAllPendingController } from "./modules/deliveries/useCases/getAllPending/GetAllPendingController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliverymen/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const createClientController = new CreateClientController()
const getAllClientDeliveriesController = new GetAllClientDeliveriesController()

const createDeliverymanController = new CreateDeliverymanController()

const createDeliveryController = new CreateDeliveryController()
const getAllPendingController = new GetAllPendingController()
const updateDeliverymanController = new UpdateDeliverymanController()

routes.post('/authenticate/client', authenticateClientController.handle)
routes.post('/authenticate/deliveryman', authenticateDeliverymanController.handle)

routes.post('/client/', createClientController.handle)
routes.get('/client/', ensureClientAuthenticated, getAllClientDeliveriesController.handle)

routes.post('/deliveryman/', createDeliverymanController.handle)

routes.post('/delivery/', ensureClientAuthenticated, createDeliveryController.handle)
routes.get('/delivery/', ensureDeliverymanAuthenticated, getAllPendingController.handle)
routes.put('/delivery/', ensureDeliverymanAuthenticated, updateDeliverymanController.handle)

export { routes }