import G11N from '../src/g11n';

describe('G11N', () => {
  describe('#bind()', () => {
    it('should be bind data to the _map attributes.', () => {
      const g11n = new G11N();
      g11n.bind({ 'hello': 'world' });
      expect(g11n._maps[g11n._namespace]['hello']).to.equal('world');
    });
  });

  describe('#t()', () => {
    const g11n = new G11N();

    g11n.bind({ 'hello': 'world' });

    it('should be get value', () => {
      expect(g11n.t('hello')).to.equal('world');
    });
  });

  describe('#import', () => {
    const g11n = new G11N();

    let server = null;

    beforeEach(() => {
      server = sinon.fakeServer.create();
    });

    afterEach(() => {
      server.restore();
    });

    describe('responding to a generic request', () => {

      beforeEach(() =>{
        const res = [
          200,
          { 'Content-type': 'application/json' },
          '{"hello":"world"}'
        ];

        server.respondWith('GET', '/base/test/mocks/en-us.json', res);
      });

      it('should get the corresponding value with namespace', () => {
        g11n.imports('/base/test/mocks/en-us');
        server.respond();
        expect(g11n.t('hello')).to.equal('world');
      });
    });
  });

});