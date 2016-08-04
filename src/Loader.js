/**
 * Reference from Phaser.Loader - https://github.com/photonstorm/phaser/blob/master/src/loader/Loader.js
 */
import 'whatwg-fetch'

export default class Loader {
  constructor() {
    this.isLoading = false
    this.hasLoaded = false
    this.fileList = []
    this.totalFileCount = 0
    this.flightQueue = []
    this.loadedFileCount = 0
    this.processingHead = 0
    this.fileLoadStarted = false
  }

  reset() {
    this.isLoading = false
    this.fileList.length = 0
    this.flightQueue.length = 0
    this.totalFileCount = 0
    this.loadedFileCount = 0
    this.processingHead = 0
    this.fileLoadStarted = false
  }

  finishedLoading(bool) {
    if (this.hasLoaded) {
      return
    }

    this.hasLoaded = true
    this.isLoading = false

    if (!bool && !this.fileLoadStarted) {
      this.fileLoadStarted = true
    }

    this.reset()
  }

  loadFile(file) {
    fetch(file.url)
      .then((res) => {
        if (res.status >= 400 && res.status <= 599) {
          file.error = true
          file.errorMessage = `load error from url ${file.url} (${res.status})`
          console.warn(file.errorMessage)
        } else {
          if (res.ok) {
            res.json()
              .then((data) => {
                file.loaded = true
                file.data = data
                file.callback && file.callback(file)
              })
              .catch((err) => {
                file.error = true
                file.errorMessage = `something error from load url ${file.url}`
                console.warn(file.errorMessage, err)
                this.processLoadQueue()
              })
          }
        }
        this.processLoadQueue()
      })
      .catch((err) => {
        file.error = true
        file.errorMessage = `something error from load url ${file.url}`
        console.warn(file.errorMessage, err)
        this.processLoadQueue()
      })
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
      const file = this.fileList[i]

      if (file.loaded || file.error) {
        if (i === this.processingHead) {
          this.processingHead = i + 1
        }
      } else if (!file.loading) {
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

  getAssetIndex(key) {
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

  addToFileList(url, key, callback) {
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
      callback,
      data: null,
      loading: false,
      loaded: false,
      error: false,
    }

    const fileIndex = this.getAssetIndex(key)

    if (fileIndex === -1) {
      this.fileList.push(file)
      this.totalFileCount++
    }
    return this
  }

  load(url, key, callback) {
    return this.addToFileList(url, key, callback);
  }

  isLoaded() {
    return this.hasLoaded
  }
}
