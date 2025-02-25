let array = []
self.addEventListener('message', (event) => {
    if(event.data === 'download'){
        const blob = new Blob(array)
        const url = URL.createObjectURL(blob)
        self.postMessage({ url }) // Send back URL
        array = []
    }else{
        array.push(event.data)
    }
})
