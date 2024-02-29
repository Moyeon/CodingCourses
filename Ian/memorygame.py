import random
import os

class Card:
    def __init__(self, number):
        self.number = number
        self.isOpen = False

    def __repr__(self):
        if self.isOpen:
            return ''.join(['〖', str(self.number), ' 〗'])
        else:
            return ''.join(['〖* 〗'])
    
    def open(self):
        self.isOpen = True
    
    def close(self):
        self.isOpen = False
        


# 2 x 4

cards = []
numbers = [1, 1, 2, 2, 3, 3, 4, 4]

def pickRandom():
    num = random.choice(numbers)
    numbers.remove(num)
    return num


for i in range(8):
    cards.append(Card(pickRandom()))

def printCards():
    os.system('clear') # window : cls / mac : clear
    print("  A     B     C     D")
    for i in range(4):
        print(cards[i], end="")
    print()
    for i in range(4, 8):
        print(cards[i], end="")
    print()
    print("  E     F     G     H")
    print()


mapping = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7}


while True:
    printCards()
    print("Select the first card : ", end="")
    first = input()
    firstIndex = mapping[first]
    if cards[firstIndex].isOpen == False:
        cards[firstIndex].open()
    else:
        #re-select card
        pass

    printCards()
    print("Select the second card : ", end="")
    second = input()
    secondIndex = mapping[second]
    if cards[secondIndex].isOpen == False:
        cards[secondIndex].open()
    else:
        #re-select card
        pass

    printCards()

    print("Press Enter", end="")
    input()

    if cards[firstIndex].number == cards[secondIndex].number:
        #stay opened
        pass
    else:
        cards[firstIndex].close()
        cards[secondIndex].close()



