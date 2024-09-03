from observer import ScoreObserver

class TicTacToeGame:
    def __init__(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
        self.score_observer = ScoreObserver()

    def handle_click(self, index):
        if self.winner or self.board[index]:
            return

        self.board[index] = 'X' if self.x_is_next else 'O'
        self.x_is_next = not self.x_is_next

        self.winner = self.calculate_winner()

        if self.winner:
            self.score_observer.update(self.winner)
        elif None not in self.board:
            self.reset_game()

    def calculate_winner(self):
        lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for line in lines:
            a, b, c = line
            if self.board[a] and self.board[a] == self.board[b] == self.board[c]:
                return self.board[a]
        return None

    def reset_game(self):
        self.board = [None] * 9
        self.x_is_next = True
        self.winner = None
