import { expect } from 'chai';
import Factory from '../src/TestDataFactory.js';

describe('TestDataFactoryTest', () => {
    describe('cloneDeep', () => {
        it('number', () => {
            expect(Factory.cloneDeep(5.1)).to.equal(5.1);
        });
        it('0', () => {
            expect(Factory.cloneDeep(0)).to.equal(0);
        });
    });
});
