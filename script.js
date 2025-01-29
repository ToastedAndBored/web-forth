
class Output {
  #outputArr = []

  print(text) {
    const output = document.querySelector('.output')
    const span = document.createElement('span')
    span.setAttribute('class', "highlighted")
    const t = document.createTextNode(text)
    span.appendChild(t)
    output.appendChild(span)
    this.#outputArr.push(span)

  }

  error(text) {
    const output = document.querySelector('.output')
    output.insertAdjacentHTML("beforeend", `
      <span class = "err">${text}</span>
      `
    )
  }

  unhighlight() {
    for (var i in this.#outputArr) {
      this.#outputArr[i].setAttribute('class'," ")
    }
  }

}

class StackExplorer {

  #stackArr = []
  #stack = []
  #callback = () => {}
  #stackObj


  constructor(stackObj,callback) {
    this.#stackObj = stackObj
    this.#callback = callback
  }

  push(value) {
    this.#stack.unshift(value)
    const span = document.createElement('span')
    span.setAttribute('class', "highlighted")
    this.#stackObj.prepend(span)
    this.#stackArr.unshift(span)

    // FIX: Replace with addTextNode
    span.insertAdjacentHTML("afterbegin", `
      <span></span><span> ${value}</span><br>
      `
    )
    this.fix_numbs()

    span.addEventListener("mouseenter", (event) => {
      this.#callback(value)
    })

    span.addEventListener("mouseleave", (event) => {
      this.#callback(null)
    })
  }

  pop() {
    const value = this.#stack.shift()
    this.#stackObj.children[0].remove()
    this.#stackArr.shift()
    this.fix_numbs()
    return value
  }

  fix_numbs() {
    for (var i in this.#stackArr) {
      this.#stackArr[i].children[0].textContent=`${i}`
    }
  }

  unhighlight() {
    for (var i in this.#stackArr) {
      this.#stackArr[i].setAttribute('class'," ")
    }
  }
}

class Dictinary {

  #dictionary = []
  #dictObj
  #dictArr = []
  #callback = () => {}

  constructor(dictObj, callback) {
    this.#dictObj = dictObj
    this.#callback = callback
  }

  define(word, definition, comment) {
    if (typeof definition !== "function") {
      definition = parseInt(definition, 10)
    }
    const dictElem = {"word":word, "def": definition, "comm":comment }
    this.#dictionary.unshift(dictElem)
    const span = document.createElement('span')
    span.setAttribute('class', "highlighted")
    this.#dictObj.prepend(span)
    this.#dictArr.unshift(span)

    // FIX: Replace with addTextNode
    span.insertAdjacentHTML("afterbegin", `
      <span>${word} </span>
      <span>${typeof definition === "function" ? "builtIn:" : definition} </span>
      <span>${comment}</span><br>
      `
    )
    this.fixlight(true)
  }

  fixlight(should) {
    let seen = new Set()
    for (var i in this.#dictArr) {
      if (seen.has(this.#dictionary[i].word)) {
        this.#dictArr[i].setAttribute("class","halflight")
      }else if(i == 0 && should) {
        this.#dictArr[i].setAttribute("class","highlighted")
      } else {
        this.#dictArr[i].setAttribute("class"," ")
      }
      seen.add(this.#dictionary[i].word)
    }
  }

  undefine(word) {
    for (var i in this.#dictionary) {
      if (this.#dictionary[i].word == word) {
        this.#dictionary.splice(i,1)
        this.#dictArr[i].remove()
        this.#dictArr.splice(i,1)
        this.fixlight(false)
        return
      }
    }
    throw new Error("Cannot undefine word with no difinition")
  }

  resolve(word) {
    for (var i in this.#dictionary) {
      if (this.#dictionary[i].word == word) {
        return this.#dictionary[i].def
      }
    }
  }

  unhighlight() {
    this.fixlight(false)
  }


}


const show_input = () => {
  const input = document.querySelector('.input')
  const words = document.querySelector('.words')
  input.setAttribute("style", "visibility: visible")
  words.setAttribute("style", "visibility: collapse;")
}

const show_words = () => {
  const input = document.querySelector('.input')
  const words = document.querySelector('.words')
  input.setAttribute("style", "visibility: collapse;")
  words.setAttribute("style", "visibility: visible;")
}

class ShowWords {
  #text= []
  #textObj
  #textArr = []
  #highlightedColor = null
  #highlightedBorder = null
  #callback = () => {}

  constructor(textObj,callback) {
    this.#textObj = textObj
    this.#callback = callback
  }

  add(text, indexable) {
    const span = document.createElement('span')
    const t = document.createTextNode(text)
    span.appendChild(t)
    this.#textObj.appendChild(span)
    this.#textArr.push(span)
    if (indexable) {
      this.#text.push(span)
    }
  }

  highlight_color(index) {
    if (this.#highlightedColor !== null) {
      this.#highlightedColor.classList.remove('highlighted')
    }
    if (index !== null) {
      this.#text[index].classList.add('highlighted')
      this.#highlightedColor = this.#text[index]
    }
  }

  highlight_border(index) {
    if (this.#highlightedBorder !== null) {
      this.#highlightedBorder.classList.remove('highlighted_border')
    }
    if (index !== null) {
      this.#text[index].classList.add('highlighted_border')
      this.#highlightedBorder = this.#text[index]
    }
  }

  unhighlight() {
    this.highlight_color(null)
    this.highlight_border(null)
  }

}

/*
'aaaaaa bbb c\n\nd e\\ \' ffffffff'
*/
/*
aaaaaa bbb c

d e\ ' ffffffff
*/
const unescape = (text) => {
  let result = ""
  let i = 0

  if (text[0] === "\'" && text[text.length-1] === "\'") {
    text = text.slice(1,-1)
  }else {
    return text
  }

  while (i < text.length){
    const a = text[i]
    const b = text.length === i ? "" : text[i+1]
    if (a === "\\" && b === "\\") {
      result += a
      i += 2
      continue
    }
    if (a === "\\" && b === '\'') {
      result += b
      i += 2
      continue
    }
    if (a === "\\" && b === "n") {
      result += '\n'
      i += 2
      continue
    }
    result += a
    i += 1
  }
  return result
}

const isSpace = (text) => {
  if (text === "\n") {
    return true
  }
  if (text === " "){
    return true
  }
  return false
}

const parser = (text) => {
  let result = []
  const space = 1
  const sWord = 2
  const cWord = 3
  let state = space
  let acc = {'origin': "", 'value': ""}
  let cW = ""
  let slash
  let fix = ""
  let i = 0
  while (i < text.length) {
    if (state === sWord) {
      // 2 -> 1
      if (isSpace(text[i])) {
        fix = text[i]
        if (/^\d+$/.test(acc.origin)) {
          acc.value = parseInt(acc.origin)
        } else {
          acc.value = acc.origin
        }
        result.push(acc)
        state = space
        i += 1
        continue
      }
      // 2 -> 2
      acc.origin += text[i]
      i += 1
    }
    if (state === space) {
      // 1 -> 2
      if (!isSpace(text[i])) {
        acc = {'origin': "",'value': ""}
        if (fix != "") {
         if (result.length == 0) {
           acc.prefix = fix
         } else {
           result[result.length-1].postfix = fix
         }
        }
        if (text[i] === "\'") {
          // 1 -> 3
          state = cWord
          cW += text[i]
          i += 1
        }else {
          // 1 -> 2
          state = sWord
        }
        continue
      }
      // 1 -> 1
      fix += text[i]
      i += 1
    }
    if (state === cWord) {
      //3 -> 1
      if (text[i] === "\'" && !slash) {
        fix = ""
        cW += text[i]
        result.push({'origin': cW,'value': unescape(cW)})
        cW = ""
        state = space
        i += 1
        continue
      }
      //3 -> 3
      if (text[i] === "\\" && !slash ) {
        slash = true
      } else {
        slash = false
      }
      cW += text[i]
      i += 1
    }
  }
  if (state === sWord || state === cWord) {
    if (state === cWord) {
      acc.value = unescape(acc.origin)
    } else if (/^\d+$/.test(acc.origin)){
      acc.value = parseInt(acc.origin)
    }
    result.push(acc)
  }
  return result
}

let outp = new Output()

const leftStackObj = document.querySelector('#left_stack')
let leftStack = new StackExplorer(leftStackObj, console.log)
const dictObj = document.querySelector('#dictionary')
const dictionary = new Dictinary(dictObj, console.log())
const wordsObj = document.querySelector(".words")
const words = new ShowWords(wordsObj,console.log())

outp.print('asdsadada')
