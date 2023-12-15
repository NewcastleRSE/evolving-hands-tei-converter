import App from './App.svelte'

// global styles must be imported through the entrypoint to be available and bundled with the build
import '../static/style.css'

// Because we are exporting a custom element, creating an App object would result in errors in the client application, so this line must be commented out (or deleted, but left here for illustrative purposes)
// const app = new App({
//   target: document.getElementById('app'),
// })

export default App
