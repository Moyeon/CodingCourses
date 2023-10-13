n = int(input())
'''
    *
   ***
  *****
 *******
*********
j k  i
4 1  1
3 3  2
2 5  3
1 7  4
0 9  5
'''
for i in range(1, n+1):
    j = n - i
    k = i * 2 - 1
    print(" "*j + "*"*k)