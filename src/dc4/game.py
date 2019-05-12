from dc4.board import Board
from dc4.move import Move
from dc4 import RED, BLACK, EMPTY, BOARD_WIDTH, BOARD_HEIGHT

class EndConditionChecker:
    def is_over(self):
        over, result = self.perform_all_checks()
        return over

    def check_line(self, i, j, di, dj):
        player = EMPTY
        in_a_row = 0
        ii = i
        jj = j
        while 0 <= ii < BOARD_WIDTH and 0 <= jj < BOARD_HEIGHT:
            new_player = self.board[ii][jj]
            if new_player == EMPTY:
                in_a_row = 0
            elif new_player == player:
                in_a_row += 1
                if in_a_row == 4:
                    return True, player
            elif new_player != player:
                in_a_row = 1
            player = new_player
            ii += di
            jj += dj
        return False, EMPTY

    def perform_all_checks(self):
        return self.perform_checks(self.check_vertical, self.check_horizontal, self.check_diagonal, self.check_full)

    def perform_checks(self, *checks):
        for check in checks:
            over, result = check()
            if over:
                return over, result
        return False, EMPTY

    def check_vertical(self):
        return self.perform_checks(*[lambda i=i: self.check_line(i,0,0,1) for i in range(BOARD_WIDTH)])

    def check_horizontal(self):
        return self.perform_checks(*[lambda j=j: self.check_line(0,j,1,0) for j in range(BOARD_HEIGHT)])

    def check_diagonal(self):
        left_up_checks = [lambda j=j: self.check_line(0,j,1,1) for j in range(BOARD_HEIGHT)]
        bottom_up_checks = [lambda i=i: self.check_line(i,0,1,1) for i in range(BOARD_WIDTH)]
        left_down_checks = [lambda j=j: self.check_line(0,j,1,-1) for j in range(BOARD_HEIGHT)]
        top_down_checks = [lambda i=i: self.check_line(i,5,1,-1) for i in range(BOARD_WIDTH)]
        return self.perform_checks(*left_up_checks + bottom_up_checks + left_down_checks + top_down_checks)

    def check_full(self):
        for i in range(BOARD_WIDTH):
            for j in range(BOARD_HEIGHT):
                if self.board[i][j] == EMPTY:
                    return False, EMPTY
        return True, EMPTY
    
    
class Game(EndConditionChecker):
    def __init__(self):
        self.board = Board()
        self.history = []
        self.turn = RED
        self.all_checks = [self.check_vertical, self.check_horizontal, self.check_diagonal, self.check_full]

    def __str__(self):
        ret = ""
        ret += self.whose_turn() + " to move\n"
        ret += str(self.board) + "\n"
        ret += "Move history: " + self.history_string() + '\n'
        return ret

    def history_string(self):
        def switch(turn):
            return BLACK if (turn==RED) else RED
        turn = RED
        ret = '['
        for move in self.history:
            ret += turn + str(move.col) + ' '
            turn = switch(turn)
        ret += ']'
        return ret


    def print_result(self):
        over, winner = self.perform_all_checks()
        if not over:
            print("That's strange.  The game is not over yet.")
        elif winner == EMPTY:
            print("It's a draw!")
        else:
            print(winner + " WINS!")

    def make_move(self, move):
        row = self.get_first_empty_in_col(move.col)
        self.board[move.col][row] = self.whose_turn()
        self.history.append(move)
        self.next_turn()

    def is_legal(self, move):
        if move is None: return False
        return self.get_first_empty_in_col(move.col) < BOARD_HEIGHT

    def get_first_empty_in_col(self, i):
        for j in range(BOARD_HEIGHT):
            if self.board[i][j] == EMPTY:
                return j
        return BOARD_HEIGHT

    def next_turn(self):
        self.turn = RED if (self.turn==BLACK) else BLACK

    def whose_turn(self):
        return self.turn

    def prompt_for_player_move(self):
        move = None
        print("Current game status:")
        print(str(self))

        while not self.is_legal(move):
            try:
                move = Move(int(input(self.whose_turn() + ", make a legal move.")))
            except:
                print("Illegal move.  Enter a number for a non-full column.")
            if self.is_legal(move):
                break
            else:
                print("Illegal move.  Enter a number for a non-full column.")

        self.make_move(move)
