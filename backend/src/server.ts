import App from './index';
import UserController from './controllers/user.controller';
import dotenv from 'dotenv';

const port = process.env.PORT || '3000';

const application = new App([new UserController()]);

export default application.listen(port);
