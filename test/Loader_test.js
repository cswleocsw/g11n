import Loader from 'Loader'
import { response } from './helper'

describe('Loader', () => {
  let loader, stub

  beforeEach(() => {
    loader = new Loader()
    stub = sinon.stub(window, 'fetch')
    stub.withArgs('/locale/en-us/hello.json').returns(response(200, { hello_US: 'world' }))
    stub.withArgs('/locale/zh-tw/hello.json').returns(response(200, { hello_TW: '世界' }))
  })

  afterEach(() => {
    stub.restore()
  })

  describe('NOTE:', () => {
    it('should be verify async file load complete', () => {
      expect(true).to.be.equal(true)
    })
  })

  describe('#load()', () => {
    const key = 'hello'
    const url = '/locale/en-us/hello.json'
    it('should add request to file list', () => {
      loader.load(url)
      expect(loader.fileList.length).to.be.equal(1)
      expect(loader.totalFileCount).to.be.equal(1)
      const file = loader.fileList[0]
      expect(file.url).to.be.equal(url)
      expect(file.key).to.be.equal(url)
      expect(file.loading).to.be.equal(false)
      expect(file.loaded).to.be.equal(false)
      expect(file.error).to.be.equal(false)
    })

    it('should set key to file list when assign specific key', () => {
      loader.load(url, key)
      expect(loader.fileList.length).to.be.equal(1)
      expect(loader.totalFileCount).to.be.equal(1)
      const file = loader.fileList[0]
      expect(file.url).to.be.equal(url)
      expect(file.key).to.be.equal(key)
      expect(file.loading).to.be.equal(false)
      expect(file.loaded).to.be.equal(false)
      expect(file.error).to.be.equal(false)
    })
  })

  describe('#start()', () => {
    it('should be run start procedure', () => {
      sinon.stub(loader, 'processLoadQueue')
      loader.load('/locale/en-us/hello.json')
      loader.start()
      expect(loader.hasLoaded).to.be.equal(false)
      expect(loader.isLoading).to.be.equal(true)
      expect(loader.processLoadQueue.called).to.be.equal(true)
      expect(loader.processLoadQueue.callCount).to.be.equal(1)
    })
  })

  describe('#processLoadQueue()', () => {
    it('should be run processLoadQueue procedure', () => {
      sinon.spy(loader, 'loadFile')
      sinon.spy(loader, 'finishedLoading')
      loader.load('/locale/en-us/hello.json')
      loader.start()
      expect(loader.fileLoadStarted).to.be.equal(true)
      const file = loader.fileList[0]
      expect(loader.flightQueue.length).to.be.equal(1)
      expect(loader.flightQueue[0]).to.be.equal(file)
      expect(file.loading).to.be.equal(true)
      expect(loader.loadFile.called).to.be.equal(true)
      expect(loader.loadFile.callCount).to.be.equal(1)
      expect(loader.finishedLoading.called).to.be.equal(false)
    })
  })
})
