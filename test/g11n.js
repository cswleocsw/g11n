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
    const en = {'hello': 'hello(en-us)'};

    it('should get the corresponding value with namespace', () => {
      const g11n = new G11N();
      g11n.imports('/base/test/mocks/en-us');
      expect(g11n.t('hello')).to.equal(en.hello);
    });
  });
});