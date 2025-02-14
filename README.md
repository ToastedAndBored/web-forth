# Web-FORTH
Visual [web-interpreter](https://toastedandbored.github.io/web-forth/) of [FORTH](https://en.wikipedia.org/wiki/Forth_(programming_language)) language (sort of) with [brainfuck](https://en.wikipedia.org/wiki/Brainfuck) flavour.

## Code examples
### Fibonacci
```
: [ .. '\n' .. ; .n @
:
  ][ -> [ <- + .n
  [ 17711 = !
  'fib' ~
  , <- 9 + <- ][ -> -> ?
; fib @

0 .n 1 [ [ [ [ .n .n fib
```

### Factorial
```
: [ .. '\n' .. ; .n @
:
  [ -> -> .n <- * <- 1 +
  [ 22 = !
  'fact' ~
  , <- 9 + <- ][ -> -> ?
; fact @
1 [ fact
```

### Random shuffle
```
: -> ][ <- ][ ; up3 @
:
  up3
  3 0 <> 1 ][ // 0 =
  'shuffle3' ~
  ! , <- 9 + <- ][ -> -> ?
; shuffle3 @
a b c
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
shuffle3 [ ..
```

### Sierpinski triangle
[Chaos game](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle#Chaos_game) algorithm
```
:
 -> ][ <-
 + 2 ][ / ->
 + 2 ][ / <-
; |> @
: [ -> -> [ <- ][ <- ; [2 @
:
  -> -> -> ][ -> ][ <-
  <- ][ -> ][ <-
  <- ][ -> ][ <-
  <- ][ -> ][ <-
; 2-3> @
:
 2-3>
 3 0 <> 1 ][ // 0 =
 '<3>' ~
 ! , <- 9 + <- ][ -> -> ?
; <3> @

0 0 [2 (>) 10 (.)
(w) 0 [2 (>) 10 (.)
2 (w) / (h) [2 (>) 10 (.)

, <3> [2 (^) |> (>) 3 (.) ^
```

## Syntax
- A text in FORTH consists of words.
- Words are separated by whitespace characters:
	- Space itself (` `)
	- Tab (`\t`)
	- New line (`\n`)
	- Carriage return (`\r`)
- Single quotation marks `'` combine several words into one word
	- Such words are called `quoted words`.
	- Within such words, some substrings are substituted.
		- `\\\\` to `\`
		- `\'` to `'`
		- `\n` to a line break character.
- Words consisting only of digits are numbers.
	- except for `quotted' words, which are always strings.

