import HttpException from './HttpException';

class EmailAlreadyInUseException extends HttpException {
  constructor() {
    super(404, 'Email is already is use');
  }
}

export default EmailAlreadyInUseException;
