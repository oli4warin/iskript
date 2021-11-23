def text_to_number(text):
    return int(''.join([str(ord(c)) for c in text]))

h = text_to_number("Your text goes here")


print("Your text as a number: " + str(h))
print("Your text 'hashed': " + str(h % 11))