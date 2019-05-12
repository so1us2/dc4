import numpy as np

from dc4 import BOARD_WIDTH
from dc4.move import Move

class Agent:
    def __init__(self):
        pass

    def make_move(self, game=None):
        '''
        Agent chooses a move and then makes it on the game that was passed in.
        '''
        move = self.get_move(game)
        game.make_move(move)

    def get_move(self, game):
        '''
        Agent selects and returns a Move object for the game that was passed in.  Does not make the move.
        '''
        raise NotImplementedError("Not yet implemented.")
