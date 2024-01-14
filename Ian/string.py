# a = 'a"pple\nhello\tthis is tab \\this is backslash \" \''
# b = "apple"
# c = '''
#     엔터를 넣고 싶을 때 사용 ''ㅁㄹㄷ''
# '''
# d = """
#     큰 따옴표 사용하기
# """
# 
# print(a)
aeiou = "aeiouAEIOU"
while True:
    s = input()
    if s == "#":
        break

    cnt = 0
    for i in range(len(s)):
        if s[i] in aeiou:
            cnt += 1
    print(cnt)
