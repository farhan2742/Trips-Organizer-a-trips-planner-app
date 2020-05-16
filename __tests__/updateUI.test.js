import { updateUI } from '../src/client/js/updateUI'


describe('Tests that the function "updateUI()" is declared' , () => {
    test('It should return true', async () => {
        expect(updateUI).toBeDefined();
    });
});

describe('Tests that the function "updateUI()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof updateUI).toBe("function");
    });
});
