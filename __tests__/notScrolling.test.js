import { notScrolling } from '../src/client/js/notScrolling'


describe('Tests that the function "notScrolling()" is declared' , () => {
    test('It should return true', async () => {
        expect(notScrolling).toBeDefined();
    });
});

describe('Tests that the function "notScrolling()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof notScrolling).toBe("function");
    });
});