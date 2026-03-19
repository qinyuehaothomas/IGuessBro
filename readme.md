# I Guess Bro

## Intro (25S56 Top Quotes)
> This is so *tuff*<br>
> --- Aa****

> This is not *tuff*<br>
> --- ZXM

> **SYBAU**<br>
> --- Shaurya

> I **GUESS** bro..<br>
> --- Zach

> On My Soul<br>
> --- Q

> On Q's Soul<br>
> --- Bong

> 67<br>
> --- Qin Yue Hao

> Qin Yue Hao<br>
> --- ZXM
## How 2 Play
Go 2 [This]() link

1. Think of a number 1~100

2. Each Question shows you a grid of 100 numbers, labbeled in 3 colours

3. Select the colour of the number in mind

4. Answer all qn, The computer will guess your number

## How it works

### Magic Number Game (Original)
I Bet you know the Magic Number Game

Basically, the guesser ask the setter whether their number is in the card. The Nth Card only contains the numbers where the Nth bit is 1.

The Yes / No responses then determines the binary version of teh number.

### Modification
However, the party trick has been getting old, so I made some twists to it.

Instead of Yes / No, we label the numbers in different colours based on the `Nth bit of the number expressed in M-based system`. One question then can convey more infomation, reducing the total no. of question for a larger number, as well as make the game more colourful.

To *confuse* the players, we **map the visual of the number to a different value**.

E.g. 1 is displayed as 1, but the colouring is based on, lets say the bits of 10.

This helps to create a randomised colour grid everytime.

### Rounding?

Since 100 is not a power of 3, but it is a nice number, the last bit will not be complete, so those where the last bit is 0 will be distribute with random colour, and only 1 colour signals 1.

## Stack
Tailwind

install Tailwind cli

`./tailwindcss -i ./style.css -o ./rendered.css`

JQuery