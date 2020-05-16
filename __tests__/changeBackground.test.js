import { changeBackground } from '../src/client/js/changeBackground'


describe('Tests that the function "changeBackground()" is declared' , () => {
    test('It should return true', async () => {
        expect(changeBackground).toBeDefined();
    });
});

describe('Tests that the function "changeBackground()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof changeBackground).toBe("function");
    });
});