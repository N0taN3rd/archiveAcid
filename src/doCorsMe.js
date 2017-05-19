import axios from 'axios'
// 'https://crossorigin.me/http://lorempixel.com/400/200/nightlife/'
function useFetch (it, whereID) {
  return fetch(it, {
    method: 'GET',
    headers: new Headers({ 'Origin': location.origin })
  }).then(ret => ret.blob())
    .then(blob => {
      let imageContainer = document.getElementById(whereID)
      let image = document.createElement('img')
      image.src = URL.createObjectURL(blob)
      imageContainer.appendChild(image)
      let thanksElem = document.createElement('p')
      let cm = '<a href="https://crossorigin.me">https://crossorigin.me</a>'
      let lp = '<a href="http://lorempixel.com">http://lorempixel.com</a>'
      thanksElem.innerHTML = `Thanks ${cm} and ${lp} for being so awesome!`
      imageContainer.appendChild(thanksElem)
    }).catch(error => {
      console.error(error)
    })
}

function useAxios (it, whereID) {
  return axios.get(it, { headers: { Origin: location.origin }, responseType: 'blob' })
    .then(ret => {
      let imageContainer = document.getElementById(whereID)
      let image = document.createElement('img')
      image.src = URL.createObjectURL(ret.data)
      imageContainer.appendChild(image)
      let thanksElem = document.createElement('p')
      let cm = '<a href="https://crossorigin.me">https://crossorigin.me</a>'
      let lp = '<a href="http://lorempixel.com">http://lorempixel.com</a>'
      thanksElem.innerHTML = `Thanks ${cm} and ${lp} for being so awesome!`
      imageContainer.appendChild(thanksElem)
    }).catch(error => {
      console.error(error)
    })
}
export default function doCorsMe (urlID, whereID, purl, decode = false) {
  let getME
  let elmInnerHTML = document.getElementById(urlID).innerHTML
  if (decode) {
    getME = atob(elmInnerHTML)
  } else {
    getME = elmInnerHTML
  }
  if (!purl.ok) {
    getME = purl.ensureCorrectPrefix(getME, 'https')
  }

  try {
    return useFetch(getME, whereID)
  } catch (error) {
    return useAxios(getME, whereID)
  }
}
