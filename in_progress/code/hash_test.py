import hashlib

string_to_hash = input("Please enter your text to hash: ")

def my_hash_md5(input):
    return hashlib.md5(input.encode()).hexdigest()

def my_hash_sha1(input):
    return hashlib.sha1(input.encode()).hexdigest()

print("The md5 hashed output is: " + my_hash_md5(string_to_hash))
print("The sha1 hashed output is: " + my_hash_sha1(string_to_hash))