
export class Logger {
    static log(msg: string): void {
        process.env.LOGGING_FLAG ? console.log(msg) : {} // debuglog() TODO
    }
}