import { expect } from 'chai';
import Factory from '../src/TestDataFactory.js';

describe('TestDataFactoryTest', () => {
    describe('cloneDeep', () => {
        it('integer', () => {
            expect(Factory.cloneDeep(5)).to.equal(5);
        });
    });
});
