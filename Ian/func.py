# 1. compare
# 2. print

def fastDate(y1, m1, d1, y2, m2, d2):
    def print1():
        print(y1, ".", m1, ".", d1)
    def print2():
        print(y2, ".", m2, ".", d2)
    
    if y1 > y2:
        print2()
    else:
        print1()

fastDate(1, 2, 2, 13, y1 = 2023, y2 = 2021)