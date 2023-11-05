def bisect(arr, num):
    l = 0
    r = len(arr) - 1
    result = 0
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] >= num:
            result = mid
            r = mid - 1
        else:
            l = mid + 1
    return result

print(list(range(0, 30, 3)))
print(bisect(range(0, 30, 3), 7))