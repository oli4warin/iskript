from random import randint

game = {
    'player': {
        'name': 'cedric',
        'hp': 100,
        'mana': 20,
        'attack': 10
    },
    'playing': True,
    'round': 1,
    'monster': None
}


def player_heal(player):
    if player['mana'] >= 5:
        player['mana'] -= 5
        player['hp'] += 10


def player_attack(player, target):
    if target:
        target['hp'] -= player['attack']


def handle_action(action_code):
    if action_code == '0':
        game['playing'] = False
    elif action_code == '1':
        player_heal(game.get('player'))
    elif action_code == '2':
        player_attack(game.get('player'), game.get('monster'))
    else:
        print("I don't know this action, please choose another one!")


def clean_up():
    monster = game.get('monster')
    if monster and monster['hp'] <=0:
        game['monster'] = None
    player = game.get('player')
    if player and player['hp'] <=0:
        game['playing'] = False
        print("You lost the game!")


def monster_action(monster):
    if monster is None:
        return
    random_action = randint(0, 1)
    if random_action == 0:
        game['player']['hp'] -= monster['attack']
    elif random_action == 1:
        monster['hp'] += 3
    else:
        pass


def print_game_state():
    print(f"""
        Round: {game.get('round')}
        Player: {game.get('player')}
        Monster: {game.get('monster')}
        """)


def spawn_monster():
    if not game.get('monster'):
        game['monster'] = {'name': 'orc', 'hp': 20, 'attack': 40}


def main():
    while game['playing']:
        spawn_monster()

        print_game_state()

        action = input("What would you like to do? ")
        handle_action(action)
        clean_up()
        monster_action(game.get('monster'))
        clean_up()

        game['round'] += 1


if __name__ == "__main__":
    main()
