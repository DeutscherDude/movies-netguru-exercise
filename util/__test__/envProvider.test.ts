import { provideStringEnvVar } from "../envProvider";

describe('envProvider functionality test', () => {
    it('provideStringEnvVar function returns string value', () => {
        const key = 'NODE_ENV';
        const value = 'test';
        const result = provideStringEnvVar(key);
        expect(result).toEqual(value);
    })

    it('fetching an undefined value returns an Error', () => {
        const key = 'I_DO_NOT_EXIST';
        expect(() => { provideStringEnvVar(key) }).toThrowError();
    })

})
