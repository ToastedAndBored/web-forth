
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

let outp = new Output()

outp.print('asdsadada')
