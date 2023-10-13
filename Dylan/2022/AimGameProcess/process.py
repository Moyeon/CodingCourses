def parseFile(filename):
  file = open(filename, 'r')
  l = file.readline()
  beatarr = []

  while True:
    l = file.readline()
    if not l :
      break
    if '[HitObjects]' in l:
      break
  idx = 1
  while True:
    l = file.readline()
    if not l :
      break
    data = l.split(',')
    beatarr.append([int(data[0]) * 10 / 64, int(data[1]) * 10 / 48, data[2], idx])
    if data[3] == '2':
      idx = 1
    else:
      idx += 1
  file.close()
  return beatarr

parsed = parseFile('/Users/hoyeonlee/Library/Mobile Documents/com~apple~CloudDocs/beyondcoding/htmlcss/Dylan/AimGameProcess/Crazy Mano - Brazilian Phonk Mano (Maksimioni27) [Hard].osu')

w = open('/Users/hoyeonlee/Library/Mobile Documents/com~apple~CloudDocs/beyondcoding/htmlcss/Dylan/AimGame/phonk.js', 'w')
w.write('const beatmap = [\n')
for beat in parsed:
  w.write('\t{')
  w.write(f"x : {beat[0]},y : {beat[1]},num : {beat[3]},time : {beat[2]},")
  w.write('},\n')
w.write('];')
w.close()
