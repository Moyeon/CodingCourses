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



arr = []
arr.append(Sheep())
arr.append(Sheep())
arr.append(Sheep())

for i in range(3):
    arr[i].oneYear()
    arr[i].oneYear()

print(arr[2].age)
print(arr[1].fleece)