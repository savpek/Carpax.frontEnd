import { IResult } from './iresult';

export default class Utils {
    static unwrapResult<T>(target: any, errorHandler?: (x: string) => void): T  {
        if(target.isSuccess == undefined)
            return target;

        if(!target.isSuccess && target.error && errorHandler)
            errorHandler(target.error);

        if(!target.isSuccess && target.error)
            throw target.error;

        return target.value;
    }
}