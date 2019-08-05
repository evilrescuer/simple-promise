class SimplePromise {
    static PENDING = 'pending'
    static RESOLVED = 'resolved'
    static REJECTED = 'rejected'

    constructor(fn) {
        this.currentState = SimplePromise.PENDING
        this.lastValue = undefined
        this._error = null
        this.resolvedCallbacks = []
        this.rejectedCallbacks = []

        try {
            fn(this._resolve, this._reject)
        } catch (e) {
            this._reject(e)
        }
    }

    _resolve = (value) => {
        const self = this
        setTimeout(() => {
            if (self.currentState === SimplePromise.PENDING) {
                self.lastValue = value // value from last function
                self.currentState = SimplePromise.RESOLVED

                self.resolvedCallbacks.forEach(fn => {
                    self.lastValue = fn.bind(self)(self.lastValue)
                })
            }
        }, 0)
    }

    _reject = (error) => {
        const self = this
        setTimeout(() => {
            if (self.currentState === SimplePromise.PENDING) {
                self._error = error
                self.currentState = SimplePromise.REJECTED

                // error will be handled only once
                if(self.rejectedCallbacks.length > 0) {
                    self.lastValue = self.rejectedCallbacks[0].bind(self)(error)
                    self.currentState = SimplePromise.PENDING
                    self.resolvedCallbacks.shift()
                    self._resolve(self.lastValue)
                }
            }
        }, 0)
    }

    then = (fn) => {
        const self = this
        if (this.currentState === SimplePromise.PENDING) {
            self.resolvedCallbacks.push(fn)
        } else if (this.currentState === SimplePromise.RESOLVED) {
            fn.bind(this)(this.lastValue)
        } else if (this.currentState === SimplePromise.REJECTED) {}
        return this
    }

    catch = (fn) => {
        const self = this
        if (this.currentState === SimplePromise.PENDING) {
            self.rejectedCallbacks.push(fn)
        } else if (this.currentState === SimplePromise.RESOLVED) {

        } else if (this.currentState === SimplePromise.REJECTED) {
            fn.bind(this)(this._error)
        }
        return this
    }
}