import Loader from 'Loader'

describe('Loader', () => {
  const url = '/locale/en-us/hello.json'
  const key = 'hello'
  const callback = sinon.spy()

  describe('#load()', () => {
    it('should call addToFileList', () => {
      const loader = new Loader()
      const stub = sinon.stub(loader, 'addToFileList')
      loader.load(url, key, callback)
      expect(stub.called).to.be.equal(true)
      expect(stub.args[0][0]).to.be.equal(url)
      expect(stub.args[0][1]).to.be.equal(key)
      expect(stub.args[0][2]).to.be.equal(callback)
      stub.restore()
    })
  })

  describe('#addToFileList()', () => {
    let loader

    beforeEach(() => {
      loader = new Loader()
    })

    it('should add request to file list with key and callback', () => {
      loader.addToFileList(url, key, callback)
      expect(loader.fileList.length).to.be.equal(1)
      expect(loader.totalFileCount).to.be.equal(1)
      const file = loader.fileList[0]
      expect(file.key).to.be.equal(key)
      expect(file.url).to.be.equal(url)
      expect(file.callback).to.be.equal(callback)
      expect(file.data).to.be.equal(null)
      expect(file.loading).to.be.equal(false)
      expect(file.loaded).to.be.equal(false)
      expect(file.error).to.be.equal(false)
    })

    it('should has only one file setting', () => {
      loader.addToFileList(url, key, callback)
      loader.addToFileList(url, key, callback)
      expect(loader.fileList.length).to.be.equal(1)
      expect(loader.totalFileCount).to.be.equal(1)
    })

    it('should use url as key when key is undefined', () => {
      loader.addToFileList(url)
      const file = loader.fileList[0]
      expect(file.key).to.be.equal(url)
    })

    it('should use url as key when key is null', () => {
      loader.addToFileList(url, null)
      const file = loader.fileList[0]
      expect(file.key).to.be.equal(url)
    })

    it('should use url as key when key is \'\'', () => {
      loader.addToFileList(url, '')
      const file = loader.fileList[0]
      expect(file.key).to.be.equal(url)
    })
  })

  describe('#getAssetIndex()', () => {
    it('should has only one file setting', () => {
      const loader = new Loader()
      const file = {
        key: key,
        url: url,
        callback,
        data: null,
        loading: false,
        loaded: false,
        error: false,
      }
      loader.fileList.push(file)
      expect(loader.getAssetIndex(key)).to.be.equal(0)
    })
  })

  describe('#start()', () => {
    let loader, stub

    beforeEach(() => {
      loader = new Loader()
      stub = sinon.stub(loader, 'processLoadQueue')
    })

    afterEach(() => {
      stub.restore()
    })

    it('should be run processLoadQueue procedure', () => {
      loader.load(url)
      loader.start()
      expect(loader.hasLoaded).to.be.equal(false)
      expect(loader.isLoading).to.be.equal(true)
      expect(stub.called).to.be.equal(true)
    })

    it('should be retun when loader has Loaded', () => {
      loader.load(url)
      loader.isLoading = true
      expect(loader.isLoading).to.be.equal(true)
      loader.start()
      expect(stub.called).to.be.equal(false)
    })
  })

  describe('#processLoadQueue()', () => {
    let loader, stub, file

    beforeEach(() => {
      loader = new Loader()
      stub = sinon.stub(loader, 'loadFile')
      loader.load(url)
      file = loader.fileList[0]
    })

    afterEach(() => {
      stub.restore()
    })

    it('should add loading file to flightQueue', () => {
      expect(loader.flightQueue.length).to.be.equal(0)
      expect(loader.isLoading).to.be.equal(false)
      expect(file.loaded).to.be.equal(false)
      expect(file.error).to.be.equal(false)
      loader.start()
      expect(file.loading).to.be.equal(true)
      expect(loader.flightQueue.length).to.be.equal(1)
      expect(loader.flightQueue[0]).to.be.equal(file)
      expect(stub.called).to.be.equal(true)
      expect(loader.fileLoadStarted).to.be.equal(true)
      expect(loader.loadedFileCount).to.be.equal(0)
    })

    it('should remove file from flightQueue when file is loaded', () => {
      loader.start()
      expect(loader.flightQueue.length).to.be.equal(1)
      expect(file.loading).to.be.equal(true)
      expect(stub.called).to.be.equal(true)
      file.loaded = true
      loader.processLoadQueue()
      expect(loader.flightQueue.length).to.be.equal(0)
      expect(file.loading).to.be.equal(false)
    })

    it('should remove file from flightQueue when file is error', () => {
      loader.start()
      expect(loader.flightQueue.length).to.be.equal(1)
      expect(file.loading).to.be.equal(true)
      expect(stub.called).to.be.equal(true)
      file.error = true
      loader.processLoadQueue()
      expect(loader.flightQueue.length).to.be.equal(0)
      expect(file.loading).to.be.equal(false)
    })


  })
})
