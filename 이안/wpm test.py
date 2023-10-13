import time
test = ["The cat (Felis catus) is a domestic species",
        "of small carnivorous mammal.",
        "It is the only domesticated species in the",
        "family Felidae and is commonly referred to",
        "as the domestic cat or house cat to",
        "distinguish it from the wild members",
        "of the family.",
        "Cats are commonly kept as house pets but can",
        "also be farm cats or feral cats;",
        "the feral cat ranges freely and avoids",
        "human contact.",
        "Domestic cats are valued by humans for",
        "companionship and their ability to kill vermin.",
        "About 60 cat breeds are",
        "recognized by various cat registries."]


print("Typeing Game Start: Y or N")
a = input()
while(a != "Y"):
    a = input()
score = 0
start = time.time()

for i in range(len(test)):
    print(test[i])
    my = input()
    if(my == test[i]):
        score += len(test[i])
    if(time.time() - start > 30):
        break
print("Typing Ended")
print("Your Score is :", score)