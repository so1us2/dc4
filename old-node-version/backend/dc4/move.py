from dc4 import BOARD_WIDTH

class Move:
    def __init__(self, col):
        if not type(col) is int:
            raise TypeError()
        if col < 0 or BOARD_WIDTH <= col:
            raise ValueError("Column must be between %d and %d".format(0, BOARD_WIDTH))
        self.col = col
    def __str__(self):
        return str(self.col)
