import numpy as np

from dc4.agent import Agent
from dc4.move import Move
from dc4 import BOARD_WIDTH

DEFAULT_TAU = 0.4
ALL_MOVES = [Move(i) for i in range(BOARD_WIDTH)]

class AlphaAgent(Agent):
    def __init__(self, tau=DEFAULT_TAU):
        self.tau = tau

    def get_alpha_probas(self, game):
        raise NotImplementedError("The method not implemented")

    def apply_temperature(self, probas, tau=None):
        '''
        Raises probas to tau power and renormalizes.
        '''
        if tau is None and self.tau is None:
            raise ValueError("tau must be set.")
            
        if tau is None:
            tau = self.tau
        
        probas = probas ** tau
        return probas / np.sum(probas)
        
    def mask_illegal_move_probas(self, game, probas):
        '''
        Sets illegal moves' probabilities to zero, then linearly renormalizes
        back to probability 1.

        Arguments:
        game -- the game or which legal moves are to be determined.
        probas -- move probabilities, some possibly corresponding to illegal moves.

        Returns:
        normed_probas -- the normalized list of legal probabilities
        '''
        mask = np.array([game.is_legal(Move(i)) for i in range(BOARD_WIDTH)])
        probas *= mask
        return probas / np.sum(probas)

    def get_move(self, game=None, tau=None):
        '''
        Alpha Agents make a move based on the alpha probas it generates for a given situation.
        '''
        if game is None:
            raise ValueError("game cannot be None.")

        if tau is None:
            tau = self.tau
              
        alpha_probas = self.mask_illegal_move_probas(game, self.get_alpha_probas(game))
     
        final_probas = self.apply_temperature(alpha_probas)
        
        return np.random.choice(ALL_MOVES, 1, p=final_probas)[0]