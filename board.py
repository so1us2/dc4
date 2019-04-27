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
        for j in range(5,-1,-1):
            for i in range(7):
                ret += self.board[i][j] + ' '
            ret += '\n'
        return ret
    
    def __getitem__(self, i):
        '''
        So that board[i][j] is at Cartesian location i,j from bottom-left corner.  
        '''
        return self.board[i]