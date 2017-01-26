export interface IResult<T> {
    isSuccess: boolean;
    error?: string;
    value?: T;
}