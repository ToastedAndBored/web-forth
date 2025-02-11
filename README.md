# web-forth
https://toastedandbored.github.io/web-forth/

## Project 
Web-interpreter of FORTH language with visualization of the work process.

## Developed
A page divided vertically into three panels of equal width:
- The panel with the source code
- The panel displaying two interpreter stacks and dictionary
- A panel displaying the program output in text and drawing on canvas

There are four buttons below the panels in desctop and two extra in mobile mode
- Start
- Stop
- Take one step
- Run program
- Next panel
- Prev panel

Also site has labels that show:
- Steps
- Words in program

The user can enter any FORTH code in the left panel and run it for execution.
During the interpretation process, the word that being executed on the left panel is highlighted in color.

The center panel displays the contents of the data stack one after another,
the interpreter call stack and the dictionary of words declared by the program.
When you move the cursor over a value in the call stack, the word on the 
left panel is boxed (if word existes).
The same is true for word definitions in the dictionary.
Overridden words in the dictionary are displayed semi-transparent.

The right panel contains the text output by the executable program and it contains a canvas
on which the executable code is able to draw.

### Mobile ready UI
On narrow vertical screens of smartphones, the page is not divided into three vertical panels, but displays one panel, the mode of which can be changed with the Next and Prev buttons.

## Video demonstrations



## FORTH
This project uses one of the FORTH language variations
(different from the original FORTH).

## Syntax
- A text in FORTH consists of words.
- Words are separated by non-significant characters:
	- Space
	- Tab character (`\t`)
	- New line character (`\n`)
	- Carriage return character (`\r`)
- Single quotation marks `'` combine several words into one word
	- Such words are called `quoted words'.
	- Within such words, some substrings are substituted.
		- `\\\\` to `\`
		- `\'` to ```
		- `\n` to a line break character.
	- In this case, the quotation marks framing the word are deleted.
- Words consisting only of digits are numbers.
	- except for `quotted' words, which are always strings.

Thus the following text on FORTH:
```forth
  : a b c ; d e
f g 'a \n \n bb'
hijk l


m       n    145
```


