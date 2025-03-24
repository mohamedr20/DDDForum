import HttpException from './HttpException';

class ValidationException extends HttpException {
  constructor() {
    super(400, 'Unable to validate this payload');
  }
}

export default ValidationException;
