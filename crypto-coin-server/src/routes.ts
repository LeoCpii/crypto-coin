import { Router } from 'express';
import HealthController from './controller/health.controller';
import SecurityController from './controller/security.controller';
import UserController from './controller/user.controller';
import BrokerController from './controller/broker.controller';

const routes = Router();

// HEALTH
routes.get('/health', HealthController.discovery);

// SECURITY
routes.post('/security/create-user', SecurityController.createUser);

// USER
routes.get('/user', UserController.user);
routes.get('/user/:email/wallet', UserController.wallet);
routes.post('/user/:email/wallet/:walletId/add', UserController.addCoin);
routes.post('/user/:email/wallet/:walletId/contribution', UserController.contribution);

// BROKER
routes.get('/broker/ping', BrokerController.discovery);
routes.get('/broker/list', BrokerController.list);
routes.get('/broker/coin/:coinId', BrokerController.detail);

export default routes; 