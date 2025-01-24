
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

const parser = (text) => {

}

let outp = new Output()

const leftStackObj = document.querySelector('#left_stack')
let leftStack = new StackExplorer(leftStackObj, console.log)
const dictObj = document.querySelector('#dictionary')
const dictionary = new Dictinary(dictObj, console.log())
const wordsObj = document.querySelector(".words")
const words = new ShowWords(wordsObj,console.log())

outp.print('asdsadada')
