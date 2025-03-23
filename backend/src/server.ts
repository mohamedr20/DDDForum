import App from './index';
import UserController from './controllers/user.controller';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT || '3000';

const application = new App([new UserController()]);

export default application.listen(port);
