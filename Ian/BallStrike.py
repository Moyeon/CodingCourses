import random

answer = [] # 3, 4, 1, 5

l = list(range(0, 10))
for i in range(4):
    r = random.choice(l)
    answer.append(r)
    l.remove(r)

def guess(answer, g):
    ans = [i for i in answer]
    strike = 0
    for i in range(4):
        if ans[i] == g[i]:
            strike += 1
            ans[i] = -1
            g[i] = -2
    
    ball = 0
    for i in range(4):
        if g[i] in ans:
            ball += 1
    return strike, ball

nth = 0
while True:
    inputNum = list(map(int, input().split()))
    nth += 1

    a, b = guess(answer, inputNum)
    print("TRY", nth, ":", end=" ")
    if a == 4:
        print("You Win!!!")
        break
    elif a > 0:
        print(a, "S", end=" ")
    if b > 0:
        print(b, "B", end=" ")
    if a == 0 and b == 0:
        print("OUT", end=" ")
    print()
    