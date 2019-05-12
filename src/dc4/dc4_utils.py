from dc4.game import Game, PlayerQuitGame
from dc4.agent import Agent

def play_game_player_agent(player_goes_first=True):
    game = Game()
    agent = UniformRandomAlphaAgent()
    while not game.is_over():
        if player_goes_first:
            try:
                game.prompt_for_player_move()
            except PlayerQuitGame:
                break
            if game.is_over(): break
            agent.make_move(game)
        else:
            agent.make_move(game)
            if game.is_over(): break
            try:
                game.prompt_for_player_move()
            except PlayerQuitGame:
                break
    game.print_result()

def play_game_player_player():
    game = Game()
    while not game.is_over():
        try:
            game.prompt_for_player_move()
        except PlayerQuitGame:
            break
    game.print_result()
