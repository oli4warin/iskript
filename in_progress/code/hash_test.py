import hashlib

string_to_hash = input("Please enter your text to hash: ")

def hash_md5(text):
    return hashlib.md5(text.encode()).hexdigest()

def hash_sha1(text):
    return hashlib.sha1(text.encode()).hexdigest()

print("The md5 hashed output is: " + hash_md5(string_to_hash))
print("The sha1 hashed output is: " + hash_sha1(string_to_hash))