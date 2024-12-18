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
        it('array modify', () => {
            const data = [1, 2, 3];
            const clone = Factory.cloneDeep(data);

            data[0] = 0;
            clone[2] = 2;

            expect(data[0]).to.equal(0);
            expect(clone[0]).to.equal(1);
            expect(data[2]).to.equal(3);
            expect(clone[2]).to.equal(2);
        });

        it('object', () => {
            const data = { a: 1, b: 'bebe' };
            expect(Factory.cloneDeep(data)).to.eql(data);
            expect(Factory.cloneDeep(data)).not.to.equal(data);
        });
        it('{}', () => {
            const data = {};
            expect(Factory.cloneDeep(data)).to.eql(data);
            expect(Factory.cloneDeep(data)).not.to.equal(data);
        });
        it('object modify', () => {
            const data = { a: 1, b: 'bebe' };
            const clone = Factory.cloneDeep(data);

            data.a = 0;
            clone.b = 'come';

            expect(data.a).to.equal(0);
            expect(clone.a).to.equal(1);
            expect(data.b).to.equal('bebe');
            expect(clone.b).to.equal('come');
        });

        it('array with object', () => {
            const data = [1, 'dos', { n: 3 }];
            const clone = Factory.cloneDeep(data);

            expect(data).to.eql(clone);
            expect(data[0]).to.equal(clone[0]);
            expect(data[2]).not.to.equal(clone[2]);
        });
        it('object with array', () => {
            const data = { a: 1, b: 'dos', c: [1, 2, 3]};
            const clone = Factory.cloneDeep(data);

            expect(data).to.eql(clone);
            expect(data.a).to.equal(clone.a);
            expect(data.c).not.to.equal(clone.c);
        });
    });
    describe('createFromTemplate', () => {
        const templates = {
            toreador: { name: 'Toreador', disciplines: ['Auspex', 'Celerity', 'Presence' ]},
            ventrue:  { name: 'Ventrue',  disciplines: ['Dominate', 'Fortitude', 'Presence' ]},
        };
        const factory = new Factory(templates);

        it('creates an equal but different object', () => {
            const vampire = factory.createFromTemplate('toreador');
            expect(vampire).to.eql(templates.toreador);
            expect(vampire).not.to.equal(templates.toreador);
        });

        it('uses different templates', () => {
            const artist = factory.createFromTemplate('toreador');
            const fascist = factory.createFromTemplate('ventrue');
            expect(artist).to.eql(templates.toreador);
            expect(fascist).to.eql(templates.ventrue);
        });

        it('creates independent objects', () => {
            const brujah = factory.createFromTemplate('toreador');
            const setite = factory.createFromTemplate('toreador');

            brujah.name = 'Brujah';
            brujah.disciplines[0] = 'Potence';

            setite.name = 'Setite';
            setite.disciplines[0] = 'Obfuscate';

            expect(brujah.name).to.equal('Brujah');
            expect(brujah.disciplines[0]).to.equal('Potence');

            expect(setite.name).to.equal('Setite');
            expect(setite.disciplines[0]).to.equal('Obfuscate');

            expect(templates.toreador.name).to.equal('Toreador');
            expect(templates.toreador.disciplines[0]).to.equal('Auspex');
        });

        it('throws with unknown template', () => {
            expect(() => factory.createFromTemplate('caitiff')).to.throw();
        });
    });
});
