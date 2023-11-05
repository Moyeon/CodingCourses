import sys
import pygame
import random

pygame.init()

BLACK = (0,0,0)
WHITE = (255, 255, 255)

GameDisplay = pygame.display.set_mode((500, 500))
pygame.display.set_caption("PYGAME Example") 
clock = pygame.time.Clock()

playing = True
pos_x = 250
pos_y = 250

speed_x = 0
speed_y = 0

enemy = [10, 100, 1, 1] # pos_x pos_y speed_x speed_y
enemies = []
enemies.append(enemy)
enemies.append(enemy)
enemies.append(enemy)
enemies.append(enemy)

while playing:
    GameDisplay.fill(WHITE)
    pygame.draw.circle(GameDisplay, BLACK, (pos_x, pos_y), 20)
    for enemy in enemies:
        pygame.draw.circle(GameDisplay, (255, 0, 0), (enemy[0], enemy[1]), 5)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            playing = False
            pygame.quit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                speed_x = -2
            if event.key == pygame.K_RIGHT:
                speed_x = 2
            if event.key == pygame.K_UP:
                speed_y = -2
            if event.key == pygame.K_DOWN:
                speed_y = 2
            if event.key == pygame.K_SPACE:
                playing = True
                pos_x = 250
                pos_y = 250
                speed_x = 0
                speed_y = 0
                enemy = [10, 100, 1, 1]
        
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT:
                speed_x = 0
            if event.key == pygame.K_RIGHT:
                speed_x = 0
            if event.key == pygame.K_UP:
                speed_y = 0
            if event.key == pygame.K_DOWN:
                speed_y = 0

    pos_x += speed_x
    pos_y += speed_y

    if pos_x < 20 :
        pos_x = 20
    elif pos_x > 480:
        pos_x = 480
    if pos_y < 20 :
        pos_y = 20
    elif pos_y > 480:
        pos_y = 480
    
    for i in range(len(enemies)):
        enemies[i][0] += enemies[i][2]
        enemies[i][1] += enemies[i][3]

        if enemies[i][0] < 5 or enemies[i][0] > 495 or enemies[i][1] < 5 or enemies[i][1] > 495:
            rand = random.randrange(5, 495)
            if random.randrange(0, 2) == 0:
                enemies[i][0] = rand
                enemies[i][1] = random.choice([5, 495])
            else:
                enemies[i][1] = rand
                enemies[i][0] = random.choice([5, 495])
            l = ((pos_x - enemies[i][0]) ** 2 + (pos_y - enemies[i][1]) ** 2) ** 0.5
            enemies[i][2] = (pos_x - enemies[0]) / l * 5
            enemies[i][3] = (pos_y - enemies[1]) / l * 5
        
        #conflict
        if (pos_x - enemies[i][0]) ** 2 + (pos_y - enemies[i][1]) ** 2 <= 25 ** 2:
            playing = True
            pos_x = 250
            pos_y = 250
            speed_x = 0
            speed_y = 0
            enemies = [[10, 100, 1, 1] * 4]
    pygame.display.update()
    clock.tick(60)