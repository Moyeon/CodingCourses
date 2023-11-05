import random

class Hand:
    def __init__(self):
        self.score = 0
        self.shape = "R"
    def decide(self):
        a = random.choice(["R", "S", "P"])
        self.shape = a

class RSP:
    def __init__(self):
        self.player1 = None
        self.player2 = None
    
    def gameStart(self):
        self.player1 = Hand()
        self.player2 = Hand()
    
    def decide(self):
        self.player1.decide()
        self.player2.decide()
        print("Both player decided.")
    
    def fight(self):
        p1 = self.player1.shape
        p2 = self.player2.shape
        #win => score +2
        #draw => p1 p2 score +1
        #lose => score -1


    