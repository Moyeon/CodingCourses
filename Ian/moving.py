import sys
import pygame

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

while playing:
    GameDisplay.fill(WHITE)
    pygame.draw.circle(GameDisplay, BLACK, (pos_x, pos_y), 20)
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

    enemy[0] += enemy[2]
    enemy[1] += enemy[3]

    if enemy[0] < 5 :
        enemy[2] = - enemy[2] + 1
    elif enemy[0] > 495:
        enemy[2] = - enemy[2] - 1
    if enemy[1] < 5 :
        enemy[3] = - enemy[3] + 1
    elif enemy[1] > 495:
        enemy[3] = - enemy[3] - 1

    pygame.display.update()
    clock.tick(60)