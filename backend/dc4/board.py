from dc4 import BOARD_WIDTH, BOARD_HEIGHT

class Board:
    def __init__(self):
        self.board = [['-'] * 6 for _ in range(7)]

    def __str__(self):
        '''
        Representation of board with line-breaks, as in
        - - - - - - -
        - - - - - - -
        - - - - - - -
        - - - - - - -
        - - - - B - -
        - - B R R R -
        '''
        ret = ""
        for j in range(BOARD_HEIGHT-1,-1,-1):
            for i in range(BOARD_WIDTH):
                ret += self.board[i][j] + ' '
            ret += '\n'
        return ret

    def __getitem__(self, i):
        '''
        So that board[i][j] is at Cartesian location i,j from bottom-left corner.
        '''
        return self.board[i]
