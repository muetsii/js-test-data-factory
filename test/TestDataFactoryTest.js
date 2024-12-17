import { expect } from 'chai';
import Factory from '../src/TestDataFactory.js';

describe('TestDataFactoryTest', () => {
    describe('cloneDeep', () => {
        it('null', () => {
            expect(Factory.cloneDeep(null)).to.be.null;
        });
        it('undefined', () => {
            expect(Factory.cloneDeep(undefined)).to.be.undefined;
        });

        it('number', () => {
            expect(Factory.cloneDeep(5.1)).to.equal(5.1);
        });
        it('0', () => {
            expect(Factory.cloneDeep(0)).to.equal(0);
        });
        
        it('string', () => {
            expect(Factory.cloneDeep('Dracula')).to.equal('Dracula');
        });
        it('""', () => {
            expect(Factory.cloneDeep('')).to.equal('');
        });
        
        it('true', () => {
            expect(Factory.cloneDeep(true)).to.equal(true);
        });
        it('false', () => {
            expect(Factory.cloneDeep(false)).to.equal(false);
        });

        it('[1, 2, 3]', () => {
            const data = [1, 2, 3];
            expect(Factory.cloneDeep(data)).to.eql(data);
            expect(Factory.cloneDeep(data)).not.to.equal(data);
        });

        it('[]', () => {
            const data = [];
            expect(Factory.cloneDeep(data)).to.eql(data);
            expect(Factory.cloneDeep(data)).not.to.equal(data);
        });
    });
});
