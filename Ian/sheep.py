class Sheep:
    def __init__(self):
        self.fleece = 0
        self.age = 1

    def shear(self):
        amount = self.fleece
        self.fleece = 0
        return amount
    
    def oneYear(self):
        self.age += 1
        self.fleece += 4

class Cat:
    def __init__(self):
        self.age = 1

    def oneYear(self):
        self.age += 2


animals = []

animals.append(Sheep())
animals.append(Cat())
animals.append(Sheep())

for a in animals:
    print(a.age)

for i in range(len(animals)):
    animals[i].oneYear()
    animals[i].oneYear()
    animals[i].oneYear()
    animals[i].oneYear()

print("After 4 years,")
for a in animals:
    print(a.age)