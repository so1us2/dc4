import dc4.BOARD_WIDTH
import numpy as np

from dc4.move import Move

ALL_MOVES = [Move(i) for i in range(BOARD_WIDTH)]

class Agent:
    def __init__(self):
        pass

    def make_move(self, game=None):
        '''
        Agent chooses a move and then makes it on the game that was passed in.
        '''
        pass

    def get_move(self, game):
        '''
        Agent selects and returns a Move object for the game that was passed in.  Does not make the move.
        '''
