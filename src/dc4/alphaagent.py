DEFAULT_TAU = 0.4

class AlphaAgent(Agent):
    def __init__(self, tau=DEFAULT_TAU):
        self.tau = tau

    def get_alpha_probas(self, game):
        '''
        This must be implemented by subclass.
        '''
        pass

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
        probas = probas / np.sum(probas)

    def make_move(self, game=None, tau=None):
        '''
        Alpha Agents make a move based on the alpha probas it generates for a given situation.
        '''
        if game is None:
            raise ValueError("game cannot be None.")

        if tau is None:
            tau = self.tau

        alpha_probas = self.mask_illegal_moves(self.get_alpha_probas(game))

        final_probas = alpha_probas ** tau # apply temperature to final probabilities

        return np.random.choice(ALL_MOVES, 1, p=final_probas)[0]
