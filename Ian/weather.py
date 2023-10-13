month, day = input().split(".")
month = int(month)
day = int(day)

year = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

#지금이 2월이면, 1월의 날짜를 다 더해야 함
#지금이 5월이면, 1월 + 2월 + 3월 + 4월

for i in range(1, month):
    day = day + year[i]

print(f"오늘은 2023년의 {day}번째 날입니다.")
if day % 2 == 1:
    print("오늘은 맑을 예정입니다.")
else:
    print("오늘은 비가 올 예정입니다.")