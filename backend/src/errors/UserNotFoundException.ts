import HttpException from "./HttpException";

class UserNotFoundException extends HttpException{
    constructor(errorMsg: string){
        super(404, errorMsg)
    }
}

export default UserNotFoundException;