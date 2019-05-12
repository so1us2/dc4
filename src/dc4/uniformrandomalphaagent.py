import numpy as np

from dc4 import BOARD_WIDTH
from dc4.alphaagent import AlphaAgent

class UniformRandomAlphaAgent(AlphaAgent):
    def get_alpha_probas(self, game):
        '''
        Returns probabilities for selecting a move uniform-randomly.
        '''
        return np.array([1.0/7.0] * BOARD_WIDTH)
