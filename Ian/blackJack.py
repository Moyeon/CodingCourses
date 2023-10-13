import random

cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

def pickRandom():
    picked = random.choice(cardList)
    cardList.remove(picked)
    return picked

a = pickRandom()

user1 = []
user2 = []

user1.append(pickRandom())
user1.append(pickRandom())
user2.append(pickRandom())
user2.append(pickRandom())

answer1 = "HIT"
answer2 = "HIT"

while True:
    print("User 1 :", user1, "SUM :", sum(user1))
    print("User 2 :", user2, "SUM :", sum(user2))

    if answer1 == "HIT":
        print()
        print("User 1, HIT or STAY?")
        answer1 = input()
    if answer2 == "HIT":
        print()
        print("User 2, HIT or STAY?")
        answer2 = input()

    if answer1 == "HIT":
        user1.append(pickRandom())
    if answer2 == "HIT":
        user2.append(pickRandom())
    
    if answer1 == "STAY" and answer2 == "STAY":
        break


print("--RESULT--")
print("User 1 :", user1, "SUM :", sum(user1))
print("User 2 :", user2, "SUM :", sum(user2))

if sum(user1) > 21:
    print("User 1 Died.")
    user1 = [0]
if sum(user2) > 21:
    print("User 2 Died.")
    user2 = [0]
if sum(user2) > sum(user1):
    print("User 2 WIN")
elif sum(user1) > sum(user2):
    print("User 1 WIN")
else:
    print("DRAW")