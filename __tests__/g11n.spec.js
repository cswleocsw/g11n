import { expect } from 'chai'
import G11N from 'g11n'
import sinon from 'sinon'

describe('G11N', () => {
  const g11n = new G11N()

  beforeEach(() => {
    sinon.stub(window, 'fetch')

    const res = new window.Response('{"hello":"world"}', {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    })

    window.fetch.returns(Promise.resolve(res))
  })

  afterEach(() => {
    window.fetch.restore()
  })

  describe('imports()', () => {
    it('should get locale json file', (done) => {
      // mock
      g11n.imports({
        files: ['test.json']
      })

      setTimeout(() => {
        done()
      }, 500)
    })
  })

  describe('t()', () => {
    it('should get empty string', () => {
      expect(g11n.t('OOXX')).to.be.equal('')
    })

    it('should get locale string', () => {
      expect(g11n.t('hello')).to.be.equal('world')
    })
  })

  describe('render()', () => {
    it('should get empty string', () => {
      expect(g11n.render('{%hello%}!!')).to.be.equal('world!!')
    })
  })
})
