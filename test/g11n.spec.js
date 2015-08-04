import G11N from '../src/g11n';

describe('G11N', () =>  {
    describe('#constructor()', () => {
        const g11n = new G11N();

        it('should have `maps` property', () => {
            expect(g11n).to.have.property('maps');
        });
    });

    describe('#bind()', () => {
        const g11n = new G11N();

        const en = {'hello': 'hello(en-us)'};

        g11n.bind(en);

        it('should bind language data to the maps', () => {
            expect(g11n.maps[g11n.namespace]).to.have.property('hello');
        });

        const namespace = 'en-us';

        g11n.bind(en, namespace);

        it('should bind language data to the maps with namespace', () => {
            expect(g11n.maps[namespace]).to.have.property('hello');
        });
    });

    describe('#t()', () => {
        const g11n = new G11N();

        const en = {'hello': 'hello(en-us)'};

        g11n.bind(en);

        it('should get the corresponding value', () => {
            expect(g11n.t('hello')).to.equal(en.hello);
        });

        const namespace = 'en-us';

        g11n.bind(en, namespace);

        it('should get the corresponding value with namespace', () => {
            expect(g11n.t('hello', namespace)).to.equal(en.hello);
        });

        g11n.bind({
            'test': 'hello :test'
        });

        it('should replace the content of placeholder', () => {
            expect(g11n.t('test', {':test': 'world'})).to.equal('hello world');
        });
    });

    describe('#import', () => {
        const en = {'hello': 'hello(en-us)'};

        it('should get the corresponding value with namespace', () => {
            const g11n = new G11N();
            g11n.imports('/base/test/mocks/en-us');
            expect(g11n.t('hello')).to.equal(en.hello);
        });
    });

    describe('#render', () => {
        const g11n = new G11N(),
            en = {'hello': 'hello(en-us)'};

        g11n.bind(en);

        it('should replace the content of placeholder', () => {
            expect(g11n.render('hello: {%hello%}')).to.equal('hello: hello(en-us)');
        });
    });
});