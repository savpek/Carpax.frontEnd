import { IResult } from './iresult';

export default class Utils {
    static unwrapResult<T>(target: any, handler: (x: T) => void , errorHandler?: (x: string) => void): void  {
        if(target.isSuccess === undefined) {
            handler(target);
        }
        else if(!target.isSuccess && target.error && errorHandler) {
            errorHandler(target.error);
        }
        else {
            handler(target.value);
        }
    }
}