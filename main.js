let input = prompt('Digite uma expressão regular'),
  output = []

verifyInput(input)

function verifyInput(value) {
  verifyParenthesis(value)

  alert(
    'Cadeias geradas da expressão ' + input + ' = ' + JSON.stringify(output)
  )
}

function verifyParenthesis(value) {
  if (value.match(/(?<=\().(?:\+).+?(?=\))/g)) {
    verifyOr(value)
  } else if (value.match(/((?<=\().+?(?=\)\*))|((?<=\().+?(?=\)\^\+))/g)) {
    verifySymbolsWithParenthesis(value)
  } else if (value.match(/\*|\+/g)) {
    verifySymbols(value)
  } else {
    output = input
  }
}

function verifyOr(value) {
  let aux1 = [],
    aux2 = [],
    aux3 = [],
    aux4 = [],
    aux5 = []

  if (
    value.match(
      /(?<=\().((?:\+.))+(?=\).(?=\*))|(?<=\().((?:\+.))+(?=\).(?=\^\+))/g
    )
  ) {
    aux1 = value.match(/(?<=\().((?:\+.))+(?=\).(?=\*))/g)
    aux2 = aux1[0].replace(/\+/g, '')
    aux3 = aux2.split('')
    aux4 = aux3[Math.floor(Math.random() * aux3.length)]
    aux5 = input.replace(/.(?<=\().((?:\+.))+(?=\).(?=\*))./g, aux4)

    verifyParenthesis(aux5)
  } else {
    aux1 = value.replace(/\(|\)|\+/g, '')
    output = aux1.split('')
  }
}

function verifySymbolsWithParenthesis(value) {
  let aux1 = [],
    aux2 = [],
    aux3 = [],
    aux4 = []

  for (let i = 4; i >= 0; i--) {
    aux1[i] = value.replace(/((?<=\().+?(?=\)\*))/g, '$1'.repeat(i))
    aux2[i] = aux1[i].replace(/((?<=\().+?(?=\)\^\+))/g, '$1'.repeat(i + 1))
    aux3[i] = aux2[i].replace(/((.{2})(?<=\*))/g, '$1'.repeat(i))
    aux4[i] = aux3[i].replace(/((.{3})(?<=\^\+))/g, '$1'.repeat(i + 1))
    output[i] = aux4[i].replace(/(?<=\))(\*)|(?<=\))(\^\+)|\(|\)|\*|\^\+/g, '')
  }
}

function verifySymbols(value) {
  let aux1 = [],
    aux2 = []

  for (let i = 4; i >= 0; i--) {
    aux1[i] = value.replace(/((.{2})(?<=\*))/g, '$1'.repeat(i))
    aux2[i] = aux1[i].replace(/((.{3})(?<=\^\+))/g, '$1'.repeat(i + 1))
    output[i] = aux2[i].replace(/\*|\^\+/g, '')
  }
}
