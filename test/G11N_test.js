import G11N from 'g11n'

describe('G11N', () => {
  describe('#bind()', () => {
    it('should be bind data to the _map attributes.', () => {
      const g11n = new G11N()
      g11n.bind({ 'hello': 'world' })
      expect(g11n.maps[g11n.namespace]['hello']).to.equal('world')
    })
  })

  describe('#t()', () => {
    const g11n = new G11N()
    g11n.bind({ 'hello': 'world' })
    it('should be get value', () => {
      expect(g11n.t('hello')).to.equal('world')
    })
  })

  // describe('#import', () => {
  //   let stub
  //   beforeEach(() => {
  //     stub = sinon.stub(window, 'fetch');
  //     const res = new window.Response(JSON.stringify({ hello_US: 'world' }), {
  //       status: 200,
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     });
  //     window.fetch.returns(Promise.resolve(res));
  //   })
  //
  //   afterEach(() => {
  //     stub.restore()
  //   })
  //
  //   it('should get the corresponding data from import resource json file', () => {
  //     const g11n = new G11N()
  //     g11n.imports('/locales/en-us')
  //     expect(g11n.t('hello_US')).to.be.equal('world')
  //   })
    // it('should get the corresponding data from import resource json file with array format', () => {
    //   const g11n = new G11N()
    //   g11n.imports(['/base/test/mocks/en-us', '/base/test/mocks/zh-tw'])
    //   server.respond()
    //   expect(g11n.t('hello_US')).to.equal('world')
    //   expect(g11n.t('hello_TW')).to.equal('世界')
    // })
  // })
})
