import { Router } from 'express';
import HealthController from './controller/health.controller';
import SecurityController from './controller/security.controller';
import UserController from './controller/user.controller';
import BrokerController from './controller/broker.controller';
import Auth from './auth/auth.service';

const routes = Router();

// HEALTH
routes.get('/health', HealthController.discovery);

// SECURITY
routes.post('/security/signIn', SecurityController.login);
routes.post('/security/create-user', SecurityController.createUser);

// USER
routes.get('/user', Auth.autorize, UserController.user);
routes.get('/user/wallet', Auth.autorize, UserController.wallet);
routes.post('/user/wallet/add', Auth.autorize, UserController.addCoin);
routes.post('/user/wallet/contribution', Auth.autorize, UserController.contribution);
routes.put('/user/favorite', Auth.autorize, UserController.updateFavorite);

// BROKER
routes.get('/broker/ping', Auth.autorize, BrokerController.discovery);
routes.get('/broker/list', Auth.autorize, BrokerController.list);
routes.get('/broker/coin/:coinId', Auth.autorize, BrokerController.detail);
routes.get('/broker/coin/:coinId/marketChart', Auth.autorize, BrokerController.marketChart);

export default routes;