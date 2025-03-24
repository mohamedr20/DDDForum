import HttpException from "./HttpException";

class ServerException extends HttpException{
    constructor(errorMsg: string){
        super(500, errorMsg)
    }
}

export default ServerException;