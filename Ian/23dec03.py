class Plant:
    def __init__(self, h, a, r):
        self.height = h
        self.grow = a
        self.rank = r
    def __repr__(self):
        return repr((self.height, self.grow, self.rank))

T = int(input())
for t in range(T):
    N = int(input())
    h = list(map(int, input().split()))
    a = list(map(int, input().split()))
    r = list(map(int, input().split()))

    plants = []
    for i in range(N):
        p = Plant(h[i], a[i], r[i])
        plants.append(p)
    
    plants.sort(key = lambda plant: plant.rank)
    
    print(plants)
    

