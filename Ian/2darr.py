a = []
n = int(input())

for i in range(n):
    row = []
    for j in range(n):
        row.append("")
    a.append(row)


for i in range(n):
    for j in range(n):
        if i >= j:
            a[i][j] = "*"


for row in a:
    for item in row:
        print(item, end="")
    print()