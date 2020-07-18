if("serviceWorker" in navigator) {
    // Register a SW
    navigator.serviceWorker.register('../sw.js').then((resp) => {
        console.log("Service worker registered.")
    }).catch((error) => console.log(error))
}
