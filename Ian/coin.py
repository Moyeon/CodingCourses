a = int(input())
coin = 0
types = [500, 100]

for t in types:
    n = a // t
    coin = coin + n
    a = a - t * n

if a == 0:
    print(coin)
else:
    print("X")

