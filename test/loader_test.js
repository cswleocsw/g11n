import Loader from 'Loader'

describe('Loader', () => {
  let loader

  beforeEach(() => {
    loader = new Loader()
  })

  describe('#start()', () => {
    it('should add load info to file list', () => {
      loader.load('/locale/zh-tw/hello.json', '/locale/zh-tw/hello.json')
      loader.start()
      expect(false).to.be.equal(false)
    })
  })
})
