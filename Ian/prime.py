# 1~100까지의 소수 구하기

a = []
for i in range(2, 101):
    a.append(i)

for i in range(50):
    if a[i] != 0:                    #a[i]는 소수
        for j in range(i+1, len(a)): #i번째 칸 다음 칸부터 맨 끝까지
            if a[j] % a[i] == 0:     #a[j]가 a[i]로 나누어 떨어지는 경우
                a[j] = 0             #a[j]는 소수가 아님

print(a)