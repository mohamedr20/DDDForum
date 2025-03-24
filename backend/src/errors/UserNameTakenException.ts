import HttpException from './HttpException';

class UserNameTakenException extends HttpException {
  constructor() {
    super(404, 'This username is taken');
  }
}

export default UserNameTakenException;
