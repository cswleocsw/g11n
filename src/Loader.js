/**
 * Reference from Phaser.Loader - https://github.com/photonstorm/phaser/blob/master/src/loader/Loader.js
 */
import EventEmitter from 'events'

const Event = {
  LOAD_COMPLETE: 'LOAD_COMPLETE'
}

export default class Loader extends EventEmitter {
  constructor(options = {}) {
    super()
    this.async = options.async || false
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

    this.emit(Event.LOAD_COMPLETE)
    this.reset()
  }

  loadFile(file) {
    // TODO:
    // Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience.
    // For more help, check https://xhr.spec.whatwg.org/.
    // Invoking 'send()' on a sync XHR during microtask execution is deprecated and will be removed in M53, around September 2016.
    // See https://www.chromestatus.com/features/5647113010544640 for more details.
    let xhr = new XMLHttpRequest()
    xhr.open('GET', file.url, this.async)

    const onError = (err) => {
      file.error = true
      file.errorMessage = `something error from load url ${file.url}`
      console.warn(file.errorMessage, err)
      this.processLoadQueue()
    }

    xhr.onload = () => {
      if (xhr.status >= 400 && xhr.status <= 599) {
        file.error = true
        file.errorMessage = `load error from url ${file.url} (${xhr.status})`
        console.warn(file.errorMessage)
      } else {
        try {
          file.loaded = true
          file.data = JSON.parse(xhr.responseText)
          file.callback && file.callback(file)
        } catch (err) {
          onError(err)
        }
      }
      this.processLoadQueue()
    }

    xhr.onerror = onError
    xhr.send()
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
  }

  load(url, key, callback) {
    return this.addToFileList(url, key, callback);
  }

  isLoaded() {
    return this.hasLoaded
  }
}

Loader.Event = Event
