
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

    span.insertAdjacentHTML("afterbegin", `
      <span></span><span> ${value}</span><br>
      `
    )
    this.fixNumbs()

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
    this.fixNumbs()
    return value
  }

  fixNumbs() {
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

let outp = new Output()

const leftStackObj = document.querySelector('#left_stack')
let leftStack = new StackExplorer(leftStackObj, console.log)

outp.print('asdsadada')
