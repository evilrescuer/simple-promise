# simple-promise
A simple custom promise imitating ECMA Promise

## Usage
```
// test 
const promise = new SimplePromise((resolve, reject) => {
    const CASE = 'success22'
    setTimeout(() => {
        CASE === 'success' ? resolve('Good1') : reject('Bad1')
    }, 1000)
})
promise
    .then((value1) => {
        console.log("success1:", value1)
        return 'from success1'
    })
    .catch((error1) => {
        console.log("error1:", error1)
        return 'from error1'
    })
    .then((value2) => {
        console.log("success2:", value2)
    })
    .catch((error2) => {
        console.log("error2:", error2)
    })
```
