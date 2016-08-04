import G11N from 'g11n'
import { response } from './helper'

describe('G11N', () => {
  describe('#bind()', () => {
    it('should be bind data to the map attributes.', () => {
      const g11n = new G11N()
      g11n.bind({ 'hello': 'world' })
      expect(g11n.maps[g11n.namespace]['hello']).to.equal('world')
    })
  })

  describe('#t()', () => {
    let g11n, spy

    beforeEach(() => {
      g11n = new G11N()
      g11n.bind({ 'hello': 'world' })
      spy = sinon.stub(g11n.loader, 'start')
    })

    afterEach(() => {
      spy.restore()
    })

    it('should be get value', () => {
      expect(g11n.t('hello')).to.equal('world')
      expect(spy.called).to.equal(true)
    })
  })

  describe('#import', () => {
    it('should get the data from resource', () => {
      const g11n = new G11N()
      const stub = sinon.stub(g11n.loader, 'load')
      g11n.imports('/locales/en-us')
      expect(stub.called).to.be.equal(true)
      expect(stub.callCount).to.be.equal(1)
    })

    it('should get the data from multi resource', () => {
      const g11n = new G11N()
      const stub = sinon.stub(g11n.loader, 'load')
      g11n.imports(['/locales/en-us/hello', '/locales/zh-tw/hello'])
      expect(stub.called).to.be.equal(true)
      expect(stub.callCount).to.be.equal(2)
    })
  })

})
