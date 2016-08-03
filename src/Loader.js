export default class Loader {
  constructor() {
    this.cache = {}
    this.isLoading = false
    this.hasLoaded = false
    this.fileList = []
    this.totalFileCount = 0
    this.flightQueue = []
    this.loadedFileCount = 0
    this.processingHead = 0
    this.fileLoadStarted = false
  }

  finishedLoading() {
    console.log('todo')
  }

  loadFile() {

  }

  processLoadQueue() {
    if (!this.isLoading) {
      this.finishedLoading(true)
      return
    }

    for (let i = 0; i < this.flightQueue.length; i++) {
      let file = this.flightQueue[i]

      if (file.loaded || file.error) {
        this.flightQueue.splice(i, 1)
        i--
        file.loading = false
        file.requestUrl = null
        this.loadedFileCount++
      }
    }

    for (let i = this.processingHead; i < this.fileList.length; i++) {
      const file = this.fileList[i];

      if (file.loaded || file.error) {
        if (i === this.processingHead) {
          this.processingHead = i + 1;
        }
      } else if (!file.loading && this.flightQueue.length) {
        if (!this.fileLoadStarted) {
          this.fileLoadStarted = true
        }

        this.flightQueue.push(file)
        file.loading = true
        this.loadFile(file)
      }
    }

    // error handle
    if (this.processingHead >= this.fileList.length) {
      this.finishedLoading()
    } else if (!this.flightQueue.length) {
      console.warn('aborting: processing queue empty, loading may have stalled')
      setTimeout(() => this.finishedLoading(true), 2000)
    }
  }

  start() {
    if (this.isLoading) {
      return
    }

    this.hasLoaded = false
    this.isLoading = true
    this.processLoadQueue()
  }

  getAssetIndex() {
    let index = -1

    for (let i = 0; i < this.fileList.length; i++) {
      let file = this.fileList[i]
      if (file.key === key) {
        index = i;
        if (!file.loaded && !file.loading) {
          break
        }
      }
    }

    return index
  }

  load(url, key) {
    if (url === undefined || url === null) {
      console.warn('Loader: No URL given')
      return this
    }

    if (key === undefined || key === null || key === '') {
      key = url
    }

    const file = {
      key: key,
      url: url,
      data: null,
      loading: false,
      loaded: false,
      error: false
    }

    const fileIndex = this.getAssetIndex(key)

    if (fileIndex === -1) {
      this.fileList.push(file)
      this.totalFileCount++
    }

    return this
  }
}
