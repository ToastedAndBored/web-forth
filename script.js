
class Output {
  #outputArr = []
  #outputObj

  constructor (outputObj) {
    this.#outputObj = outputObj
  }

  print(text) {
    const span = document.createElement('span')
    span.setAttribute('class', "highlighted")
    const t = document.createTextNode(text)
    span.appendChild(t)
    this.#outputObj.appendChild(span)
    this.#outputArr.push(span)

  }

  error(text) {
    this.#outputObj.insertAdjacentHTML("beforeend", `
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
    const span2 = document.createElement('span')
    const span3 = document.createElement('span')
    const br = document.createElement('br')
    span.setAttribute('class', "highlighted")
    this.#stackObj.prepend(span)
    this.#stackArr.unshift(span)

    const t = document.createTextNode(value)
    span3.appendChild(t)
    span.appendChild(span2)
    span2.setAttribute('style','padding: 5px;')
    span.appendChild(span3)
    span.appendChild(br)
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

    const tWord = document.createTextNode(word)
    const tDef = document.createTextNode(typeof definition === "function" ? "builtIn:" : definition)
    const tComment = document.createTextNode(comment)
    const spanWord = document.createElement('span')
    const spanDef = document.createElement('span')
    const spanComment = document.createElement('span')
    const br = document.createElement('br')

    span.appendChild(spanWord)
    spanWord.appendChild(tWord)
    span.appendChild(spanDef)
    spanDef.appendChild(tDef)
    span.appendChild(spanComment)
    if (comment) {
      spanComment.appendChild(tComment)
    }
    span.appendChild(br)
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
    return null
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
    if (index == null) {return}
    if (typeof index != "number") {return}
    if (index < 0) {return}
    if (index >= this.#text.length) {return}
    this.#text[index].classList.add('highlighted')
    this.#highlightedColor = this.#text[index]
  }

  highlight_border(index) {
    if (this.#highlightedBorder !== null) {
      this.#highlightedBorder.classList.remove('highlighted_border')
    }
    if (index == null) {return}
    if (typeof index != "number") {return}
    if (index < 0) {return}
    if (index >= this.#text.length) {return}
    this.#text[index].classList.add('highlighted_border')
    this.#highlightedBorder = this.#text[index]
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
        result.push({'origin': cW,'value': unescape(cW), 'quotted': true})
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
  // 3 -> END
  if (state === cWord) {
    result.push({'origin': cW,'value': unescape(cW), 'quotted': true})
  }
  // 2 -> END
  if (state === sWord) {
    if (/^\d+$/.test(acc.origin)){
      acc.value = parseInt(acc.origin)
    } else {
      acc.value = acc.origin
    }
    result.push(acc)
  }
  return result
}

class Interpretor {
  #program
  #output
  #leftStack
  #rightStack
  #dictionary
  #word
  wp = 0
  working = true

  constructor (program,output,leftStack,rightStack,dictionary) {
    this.#program = program
    this.#output = output
    this.#leftStack = leftStack
    this.#rightStack = rightStack
    this.#dictionary = dictionary
    // console.log(this.#program)
  }

  step () {
    if (this.working == false) {
      return this.working
    }

    if (typeof this.wp != "number" || this.wp < 0 || this.wp >= this.#program.length) {
      this.working = false
      throw new Error ('Wrong WP')
    }
    let word = this.#program[this.wp]
    let def = this.#dictionary.resolve(word.value)

    if (def == null || typeof word.value == "number" || word.quotted ) {
      // console.log(word,this.wp)
      this.#leftStack.push(word.value)
      this.wp += 1
      if (this.wp >= this.#program.length) {
        this.working = false
      }
      return this.working
    }

    let oldWp = this.wp
    // console.log(wp)

    if (typeof def == "function") {
      const shouldNOTInc = def()
     // console.log(def())
      if (!shouldNOTInc && oldWp == this.wp) {
        this.wp += 1
      }
      if (this.wp >= this.#program.length) {
        this.working = false
      }
      return this.working
    }
    // console.log(this.wp)

    this.#rightStack.push(this.wp+1)
    this.wp = def
    return this.working
  }
}

// let output = new Output(document.querySelector('.output'))

// const leftStackObj = document.querySelector('#left_stack')
// let leftStack = new StackExplorer(leftStackObj, console.log)

// const rightStackObj = document.querySelector('#right_stack')
// let rightStack = new StackExplorer(rightStackObj, console.log)

// const dictObj = document.querySelector('#dictionary')
// const dictionary = new Dictinary(dictObj, console.log())

// const wordsObj = document.querySelector(".words")
// const words = new ShowWords(wordsObj,console.log())

// const interpretor = new Interpretor(parser(document.querySelector(".input").value),output,leftStack,rightStack,dictionary)
// console.log(interpretor.wp)
// output.print('asdsadada')

class ExecutionInterface {

  #buttonStart //querySelector('.start')
  #buttonNext //querySelector('.next_step')
  #buttonStop //querySelector('.stop')
  #labelStep //querySelector('.steps')
  #labelWords //querySelector('.wordsL')
  #widgetLeftStack //querySelector('#left_stack')
  #widgetRightStack //querySelector('#right_stack')
  #widgetDictionary //querySelector('#dictionary')
  #widgetWords // querySelector('.words')
  #widgetOutput //querySelector('.output')
  #input //querySelector('textarea')
  #steps // counter of steps
  #words //object of ShowWords
  #leftStack //object of StackExplorer
  #rightStack //object of StackExplorer
  #dictionary // object of Dictinary
  #program // parsed input.value
  #interpretor // object of Interpretor
  #output //object of Output


  constructor (buttonStart,buttonStop,buttonNext,labelStep,labelWords,
    widgetLeftStack,widgetRightStack,widgetDictionary,widgetWords,widgetOutput,
    input) {

    this.#buttonStart = buttonStart
    this.#buttonStop = buttonStop
    this.#buttonNext = buttonNext
    this.#labelStep = labelStep
    this.#labelWords = labelWords
    this.#widgetLeftStack = widgetLeftStack
    this.#widgetRightStack = widgetRightStack
    this.#widgetDictionary = widgetDictionary
    this.#widgetWords = widgetWords
    this.#input = input
    this.#widgetOutput = widgetOutput

    this.#buttonStart.addEventListener("click", (event) => {
      this.on_start()
    })

    this.#buttonNext.addEventListener('click', (event) => {
      this.on_next()
    })

    this.#buttonStop.addEventListener('click', (event) => {
      this.on_reset()
    })

    this.#input.addEventListener('input', (event) => {
      this.on_code_change()
    })

    this.init()
  }

  init() {
    this.#words = new ShowWords(this.#widgetWords, console.log)

    this.#leftStack = new StackExplorer(this.#widgetLeftStack,(n) => {this.#words.highlight_border(n)})
    this.#rightStack = new StackExplorer(this.#widgetRightStack,(n) => {this.#words.highlight_border(n)})

    this.#dictionary = new Dictinary(this.#widgetDictionary,(n) => {this.#words.highlight_border(n)})

    this.#output = new Output(this.#widgetOutput)

    this.bind_builtin_words()
    this.on_code_change()
    show_input()
  }

  bind_builtin_words () {

    this.#dictionary.define("+", () => {
      this.#leftStack.push(this.#leftStack.pop() + this.#leftStack.pop())
    }, "Summ")

    this.#dictionary.define("-", () => {
      this.#leftStack.push(this.#leftStack.pop() - this.#leftStack.pop())
    }, "Minus")

    this.#dictionary.define("*", () => {
      this.#leftStack.push(this.#leftStack.pop() * this.#leftStack.pop())
    }, "Mult")

    this.#dictionary.define("/", () => {
      this.#leftStack.push(this.#leftStack.pop() / this.#leftStack.pop())
    }, "Div")

    this.#dictionary.define("//", () => {
      this.#leftStack.push(Math.floor(this.#leftStack.pop() / this.#leftStack.pop()))
    }, "DivInt")

    this.#dictionary.define("/.", () => {
      this.#leftStack.push(this.#leftStack.pop() % this.#leftStack.pop())
    }, "Rem")

    this.#dictionary.define("=", () => {
      this.#leftStack.push(this.#leftStack.pop() == this.#leftStack.pop())
    }, "Eqv")

    this.#dictionary.define(">", () => {
      this.#leftStack.push(this.#leftStack.pop() > this.#leftStack.pop())
    }, "More")

    this.#dictionary.define("<", () => {
      this.#leftStack.push(this.#leftStack.pop() < this.#leftStack.pop())
    }, "Less")

    this.#dictionary.define(".", () => {
      this.#interpretor.working = false
    }, "Finish program")

    this.#dictionary.define("..", () => {
      this.#output.print(this.#leftStack.pop())
    }, "Print")

    this.#dictionary.define("[", () => {
      let val = this.#leftStack.pop()
      this.#leftStack.push(val)
      this.#leftStack.push(val)
    }, "Dup")

    this.#dictionary.define("]", () => {
      this.#leftStack.pop()
    }, "Drop")

    this.#dictionary.define("][", () => {
      const first = this.#leftStack.pop()
      const second = this.#leftStack.pop()
      this.#leftStack.push(first)
      this.#leftStack.push(second)
    }, "Swap")

    this.#dictionary.define("->", () => {
      this.#rightStack.push(this.#leftStack.pop())
    }, "LtR")

    this.#dictionary.define("<-", () => {
      this.#leftStack.push(this.#rightStack.pop())
    }, "RtL")

    this.#dictionary.define("^", () => {
      this.#interpretor.wp = this.#rightStack.pop()
      return true
    }, "GoTo")

    this.#dictionary.define("^^", () => {
      let dst = this.#rightStack.pop()
      this.#rightStack.push(this.#interpretor.wp+1)
      this.#interpretor.wp = dst
      return true
    }, "Call")

    this.#dictionary.define(";", () => {
      this.#interpretor.wp = this.#rightStack.pop()
      return true
    }, "BlockEnd")

    this.#dictionary.define(";;", () => {
      this.#interpretor.wp += 2
    }, "Skip")

    this.#dictionary.define(":", () => {
      let counter = 1
      this.#interpretor.wp += 1
      this.#rightStack.push(this.#interpretor.wp)
      while ((this.#interpretor.wp < this.#program.length) && counter > 0) {
        if (this.#program[this.#interpretor.wp].value == ";") {
          counter -= 1
        }
        if (this.#program[this.#interpretor.wp].value == ":") {
          counter += 1
        }
        this.#interpretor.wp += 1
      }
    }, "GoTo")

    this.#dictionary.define("@", () => {
      this.#dictionary.define(this.#leftStack.pop(),this.#rightStack.pop())
    }, "Define")

    this.#dictionary.define("!@", () => {
      this.#dictionary.undefine(this.#leftStack.pop())
    }, "Undefine")

    this.#dictionary.define("~", () => {
      this.#rightStack.push(this.#dictionary.resolve(this.#leftStack.pop()))
    }, "Resolve")

    this.#dictionary.define(",", () => {
      this.#rightStack.push(this.#interpretor.wp)
    }, "Label")

    this.#dictionary.define("!", () => {
      this.#leftStack.push(!this.#leftStack.pop())
    }, "Not")

    this.#dictionary.define('"', () => {
      this.#leftStack.push(this.#program[this.#interpretor.wp+1])
      this.#interpretor.wp += 2
    }, "Push")

    this.#dictionary.define("?", () => {
      const first = this.#rightStack.pop()
      const second = this.#rightStack.pop()
      const condition = this.#leftStack.pop()
      this.#rightStack.push(this.#interpretor.wp + 1)
      if (condition) {
        this.#interpretor.wp = first
      } else {
        this.#interpretor.wp = second
      }
      return true
    }, "If")

    this.#dictionary.unhighlight()
  }

  unhighlight () {
    this.#leftStack.unhighlight()
    this.#rightStack.unhighlight()
    this.#dictionary.unhighlight()
    this.#words.unhighlight()
    this.#output.unhighlight()
  }

  on_error (err) {

    if (this.#interpretor) {
      this.#interpretor.working = false
    }
    this.#buttonNext.disabled = true

    this.#output.error(err.message)

  }

  on_start () {
    console.log("Start clicked")
    try {
      this.#buttonStart.disabled = true
      this.#buttonNext.disabled = false
      this.#buttonStop.disabled = false

      this.#steps = 0

      this.#labelStep.innerHTML = `${this.#steps}`

      for (var i in this.#program) {
        const element = this.#program[i]

        if (element.prefix) {
         this.#words.add(element.prefix,false)
        }

        this.#words.add(element.origin,true)

        if (element.postfix) {
          this.#words.add(element.postfix,false)
        }
      }
      show_words()

      this.#interpretor = new Interpretor(this.#program,this.#output,
        this.#leftStack,this.#rightStack,this.#dictionary)
    } catch (error) {
      this.on_error(error)
      throw error
    }

  }

  on_next () {
    console.log("Next clicked")
    try {

      this.unhighlight()

      this.#words.highlight_color(this.#interpretor.wp)
      const step = this.#interpretor.step()

      if (!step) {
        this.#buttonNext.disabled = true
        this.#output.print('\nFINISHED')
      }

      this.#steps += 1

      this.#labelStep.innerHTML = `${this.#steps}`
    } catch (error) {
      this.on_error(error)
      throw error
    }
  }

  on_reset () {
    console.log("Reset clicked")

    show_input()

    this.#widgetWords.replaceChildren()
    this.#widgetLeftStack.replaceChildren()
    this.#widgetRightStack.replaceChildren()
    this.#widgetDictionary.replaceChildren()
    this.#widgetOutput.replaceChildren()

    this.#buttonNext.disabled = true
    this.#buttonStop.disabled = true
    this.#buttonStart.disabled = true

    this.init()
  }

  on_code_change () {

    const text = this.#input.value
    this.#program = parser(text)

    this.#labelWords.innerHTML = `${this.#program.length}`

    if (this.#program.length > 0) {
      this.#buttonStart.disabled = false
    }else {
      this.#buttonStart.disabled = true
    }
  }

}

new ExecutionInterface(
  document.querySelector('.start'),
  document.querySelector('.stop'),
  document.querySelector('.next_step'),
  document.querySelector('.steps'),
  document.querySelector('.wordsL'),
  document.querySelector('#left_stack'),
  document.querySelector('#right_stack'),
  document.querySelector('#dictionary'),
  document.querySelector('.words'),
  document.querySelector('.output'),
  document.querySelector('.input'),
)

