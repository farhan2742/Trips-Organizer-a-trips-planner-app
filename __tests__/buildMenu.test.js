import { buildMenu } from '../src/client/js/buildMenu'


describe('Tests that the function "buildMenu()" is declared' , () => {
    test('It should return true', async () => {
        expect(buildMenu).toBeDefined();
    });
});

describe('Tests that the function "buildMenu()" is a function' , () => {
    test('It should be a function', async () => {
        expect(typeof buildMenu).toBe("function");
    });
});