class CV {
    /**
     * We will use this method privately to communicate with the worker and
     * return a promise with the result of the event. This way we can call
     * the worker asynchronously.
     */
    _dispatch(event) {
      const { msg } = event;
      this._status[msg] = ['loading'];
      this.worker.postMessage(event);
      return new Promise((res, rej) => {
        let interval = setInterval(() => {
          const status = this._status[msg];
          // if (!status || status == undefined) res(true);
          if (status[0] === 'done') {
            res(status[1]);
          } else if (status[0] === 'error') rej(status[1]);
          else if (status[0] !== 'loading') {
            delete this._status[msg];
            clearInterval(interval);
          }
        }, 0);
      });
    }
  
    /**
     * First, we will load the worker and we will capture the onmessage
     * and onerror events to know at all times the status of the event
     * we have triggered.
     *
     * Then, we are going to call the 'load' event, as we've just
     * implemented it so that the worker can capture it.
     */
    load() {
      this._status = {};
      
      if (typeof window !== "undefined") {
        this.worker = new Worker(new URL('./worker.js', import.meta.url), {
          type: 'module',
        });
    
        // Capture events and save [status, event] inside the _status object
        this.worker.onmessage = (e) => (this._status[e.data.msg] = ['done', e]);
        this.worker.onerror = (e) => (this._status[e.data.msg] = ['error', e]);
    
        return this._dispatch({ msg: 'load' });
      } else {
        console.error("Workers can only be used in the browser");
        return Promise.reject("Workers not available");
      }
    
    

  
      // Capture events and save [status, event] inside the _status object
      this.worker.onmessage = (e) => (this._status[e.data.msg] = ['done', e]);
      this.worker.onerror = (e) => (this._status[e.data.msg] = ['error', e]);
      return this._dispatch({ msg: 'load' });
    }
  
    /**
     * We are going to use the _dispatch event that we created before to
     * call the postMessage with the msg and the image as payload.
     *
     * Thanks to what we have implemented in the _dispatch, this will
     * return a promise with the processed image.
     */
    imageProcessing(payload) {
      return this._dispatch({ msg: 'imageProcessing', payload });
    }
  
    predict(payload) {
      return this._dispatch({ msg: 'predict', payload });
    }
  }
  
  // Export the same instant everywhere
  export default new CV();