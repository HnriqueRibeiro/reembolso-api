class AppError {

    message: string
    statuscode: number

    constructor(message:string, statuscode:number = 400){
        this.message = message
        this.statuscode = statuscode
    }
}

export {AppError}