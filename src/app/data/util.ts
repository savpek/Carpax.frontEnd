import { IResult } from './iresult';

export default class Utils {
    static unwrapResult<T>(target: any, handler: (x: any) => void , errorHandler?: (x: string) => void): void  {
        if (target.isSuccess === undefined) {
            if (!Array.isArray(target)) {
                handler(([target]))
            } else {
                handler(target)
            }
        } else if (!target.isSuccess && target.error && errorHandler) {
            console.error('Result returned error:', target.error);
            errorHandler(target.error);
        } else {
            if (!Array.isArray(target.value)) {
                handler(([target.value]))
            } else {
                handler(target.value)
            }
        }
    }
}
