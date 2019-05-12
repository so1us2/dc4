from dc4.game import Game
from dc4.agent import Agent

def play_game_player_agent(player_goes_first=True):
    game = Game()
    agent = Agent(game)
    while not game.is_over():
        if player_goes_first:
            game.prompt_for_player_move()
            agent.make_move(game)
        else:
            agent.make_move(game)
            game.prompt_for_player_move()
    game.print_result()

def play_game_player_player():
    game = Game()
    while not game.is_over():
        game.prompt_for_player_move()
    game.print_result()
