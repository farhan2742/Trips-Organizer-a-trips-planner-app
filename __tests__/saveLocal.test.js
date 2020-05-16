import { saveLocal } from '../src/client/js/saveLocal'


describe('Tests that the function "saveLocal()" is declared' , () => {
    test('It should return true', async () => {
        expect(saveLocal).toBeDefined();
    });
});

describe('Tests that the function "saveLocal()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof saveLocal).toBe("function");
    });
});