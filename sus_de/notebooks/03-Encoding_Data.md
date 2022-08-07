---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.13.8
  kernelspec:
    display_name: Python 3 (ipykernel)
    language: python
    name: python3
---

# Data

In computer science one of the most important tasks is to encode and decode data for different jobs or processes. We have previously seen how individual bits can be used to digitally represent an image file. However, computers are used in many more applications: Word processing; calculations; viewing and editing of images, video or music; browsing the internet and so on. All of these proesses boil down to ones and zeros being written and interpreted somewhere inside your computer.

Everything that can be input into a computer can be considered **data**. We will give a brief overview of the different ways in which a computer will translate that data into the ones and zeros it needs to operate. Be aware that this is only a brief introduction and we will not be going into great detail. The finer points of all of these representations will be dealt with later in the curriculum.


## Analog vs. Digital
In the natural world most processes are continuous; i.e. every measured value can be determined (in theory) with infinite precision. Obviously, there are some real world limits to this precision, but they only matter in very specific cases and are not really relevant in our everyday life.  

Computers on the other hand, by their basic nature, are finite machines: There are only so many bits at our disposal and we need to make them matter. #EveryBitMatters

This means that all the information inputted and stored in computers has to be modified to fit the way computers *think*. For example: A mercury thermometer is an analog device in theory if we had a fine enough scale, we could measure the temperature with *infinte* precision (well down to the size of a mercury atom at least). However, if we look a thermometer, we may simply say that is shows $25^{\circ}$. For everyday purposes this is sufficiently precise and this is the value we would input into a computer. This process of **discretization** is typical for way computers work - think of it as rounding up or down. In this case both $24.99876^{\circ}$ and $25.32298^{\circ}$ would both be coded as $25^{\circ}$.


## Representing Numbers
Numbers in a computer are written using the **binary number system**. This is a system of numbers,  that only uses ones and zeros. Due to the way computers are physically set up, this is the logical way for representing numbers. In the binary number system every position corresponds to a power of two: $2^0,\ 2^1,\ 2^2,\ 2^3,\ldots$ etc. Just remember that we read the powers from right to left in ascending order. So the binary number
$$
10011
$$
translates to 
$$
2^4+2^1+2^0=19
$$
This is pretty easy to understand for whole positive numbers. We will later see how computers deal with fractions and negative numbers (spoilers: there will be some math involved).

Each one or zero is called a **bit**. You may have heard of 32-bit vs. 64-bit operating systems. This just means that each data point has 32 or 64 bits available to store information. Basically, the more bits you have the bigger the numbers you can store and the more precise your information will be. 


### Exercise
> Determine the decimal representation of the following binary numbers:
>
> 101
>
> 10
>
> 10101
>
> 111
>
> 10000
>
> 11111


### Exercise
>Determine the binary representation of the following decimal numbers:
>
>42
>
>17
>
>16
>
>100


## Getting Help from the Computer

Since the Computer operates with bits and represents decimal numbers as binary numbers, we can also use the help of the computer to convert from one number system to the other. You should be able to do this by hand, but it is sometimes handy to check the result very quickly.

In Python you can use the function `bin(number)` to convert a decimal number into its binary representation. You can also use the function `print(str)` to print something out.

```python
# Store the value 17 in the variable number_dec
number_dec = 17

# Convert whatever value is stored in number_dec into binary representation
# and store it in the variable number_bin
number_bin = bin(number_dec)

# Print out whatever value is stored in the variable number_bin
print(number_bin)
```

The output of this code cell might be a bit unfamiliar, espacially the `0b` in front of the binary number. This is just Python letting us know that this is a binary number we are looking at.

### From Binary to Decimal

We can also convert in the other direction. The function `int(str, base)` provides this functionallity.

```python
# int takes a binary number as string (we do need the ' ' here)
# and converts it into a decimal number, according to the base,
# which is 2 in this case, and stores it in number_bin
#
# We need base 2 since we convert from a binary number.
number_bin = int('11010', 2)
print(number_bin)
```

## Representing Text
In order to represent text in a computer every character and command option (e.g. space, tab, line break etc.) has to stored digitally. We do this by  giving each letter, number, punctuation character, special character and command option a number and storing those numbers together with a *translation table* so the computer knows what to show on the screen. This translation table is called a **character set**.


### ASCII vs. Unicode
There are two main character sets you should know of: ASCII which stands for *American Standard Code for Information Interchage* and Unicode which is an initernational extension of ASCII. ASCII uses an 7-bit encoding scheme which allows for 128 different characters, numbers and commands to be encoded. This is sufficient for plain English text but if we want to encode text in other languages where there may be accents on certain letters or completely different alphabets (think Russian or Chinese) these 256 characters get used up pretty quickly. 

Uniicode is an extension of ASCII in the sense that the ASCII characters remain encoded with the same bits (with some leading zeros added). Currently, Unicode defines 143,859 different characters. The way this works is not trivial. The following video may give you a small insight:

```python
from IPython.display import YouTubeVideo

YouTubeVideo('MijmeoH9LT4', width=800, height=450)
```

### Exercise
> Use the following ASCII Table to look up the ASCII numbers for the characters in "Hello":
>![asciifull.gif](attachment:asciifull.gif)


## Computer to the Rescue, Again

We can also ask Python to lookup a single character in the ASCII-table, as well as giving us the character for a value in the ASCII-table.

```python
# Store the character 'H' in the variable character
character = 'H'

# Get the ascii value of whatever is stored in character
ascii_value = ord(character)

# Print out whatever value is stored in ascii_value
print(ascii_value)
```

And the other direction can be computed as follows.

```python
# Store the number 65
number = 65

# Lookup the character for the value 65 in the ASCII-table
character = chr(number)

# Print the character
print(character)
```

## Through the Eyes of a Computer

Let's inspect some simple text files throught the eyes of the computer. The code in the next cells is a bit hacky and you don't have to remember this, but the output of the cells is interesting for us, so we do the hacky thing and just look at the output.

### Exercise

> Execute the next code cell and look at the output.

```python
!python -m hexdump res/ascii-test.txt
```

#### How to Read this Output

On the far left side, you can see the position inside the file. All `0`s means that we start at the beginning of the file, at the first bit. When there are more than one block, the number on the left side tells you which bit is the first number in the middle column.

The middle column is the content of the file in hexadecimal. We briefly touched on this in the images chapter. For now you just have to know that it is easier for us to look at the hex values that at the binary values. An it is also easier to display them than decimal values, since we can display them in pairs of two. Each pair in the middle column stands for 8-bits in the original file. This means that we can read each one of these pairs (let's call them bytes) as one character in our file.

The right column is the most readable for us. It just contains the characters as we interpret them with the ASCII-table.

#### A longer File

We can also look at a longer file , so that the output makes a bit more sense to us.

```python
!python -m hexdump res/ascii-long.txt
```

### Exercise

> Lookup some of the bytes in the ASCII-table to verify that the encoding is indeed correct.

### Exercise

> Look at the middle column. Can you find any values starting with an `8`? Why is this the case?


## Representing Images
As we saw previously, images are saved by encoding each pixel as a binary number that represents its color in the RGB color space. The number of bits an image needs depends on the number of pixels (dots) per inch **dpi** it uses and its dimensions.


### Exercise
> How many bits of memory does an image use if it is 800 pixels wide, 600 pixels high and uses an 8-bit color space (This is the standard for a GIF)?

<!-- #region -->
### Vector Graphics
Another method of representing images are so-called **vector graphics**. Here instead of giving each pixel a color value, we pass a set of *drawing instructions* to the computer. For example we may specify where we want to draw a circle and define radius, line width, line color and fill color to get a neatly drawn circle:
![](res/Test.svg)

The code that draws this circle is 
```svg
<svg width="100" height="100"> 
    <ellipse style="fill:#00ff00;stroke:#000000;" cx="50" cy="50" rx="48" ry="48">
    </ellipse>
</svg>
```
If we want to draw this in a code block we have to preface it with `%%svg`:
<!-- #endregion -->

```svg
<svg width="100" height="100"> 
    <ellipse style="fill:#00ff00;stroke:#000000;" cx="50" cy="50" rx="48" ry="48">
    </ellipse>
</svg>
```

### Exercise
> Change the circle above so that the radius is larger, the fill color is orange and the stroke color is white.


### Remark
This type of graphic is called **SVG** for *Scalable Vector Graphic*. It uses commands to tell the computer what to draw. The commands are delimited by the symbols `<...>` and `</...>` - so-called **tags**. Vector graphics are very useful for diagrams or geometric images. In these cases they tend to create smaller file sizes. Another key feature of vector graphics is that they are *infinitely scalable*; this means that the memory used does not depend on the output size.

```svg
<svg width="300" height="100">
    <rect width="300" height="100" style="fill:#0000ff">
    </rect>
</svg>
```

### Exercise
> Regard the rectangle above. How many bits does this image use as a bitmap? How many biits does it use as an SVG graphic?


## Representing Video
Video can be thought of as an extension of the representation of images. In general a video is comprised of approximately 30 frames (or images) per second at a given resolution.


### Exercise
> Standard HD video is encoded at 720p; this means that it contains 720 rows of pixels in a 16:9 aspect ratio. YouTube's standard color depth is 8 bits per color channel. How many bits does a 90 minute HD film use?


## Representing Audio
Audio is the trickiest encoding to try to explain in a only few sentences. A lot of complex math is involved, but in its most basic sense we try to translate the sound waves first into electrical signals and these again into ones and zeros. Loudspeakers (or headphones) are actually analog devices: An electrical signal is sent to them and this causes a membrane to vibrate in the exact frequencies necessary to be interpreted correctly by our brains.

In order to translate the electric signal to digital, we measure the voltage (frequency) at a certain rate per second - called **sampling**. And store this number in a file. 


### Exercise
> The WAV (Waveform Audio File) format is enoded at a sampling rate of 44'100Hz with 16 bits per sample. How many bits of memory does the WAV encoding of *Bohemian Rhapsody* (runtime: 6 minutes) use? 
