class Observer:
    def update(self, winner):
        pass

class ScoreObserver(Observer):
    def __init__(self):
        self.player_one_score = 0
        self.player_two_score = 0
        self.message = None

    def update(self, winner):
        if winner == 'X':
            self.player_one_score += 1
        elif winner == 'O':
            self.player_two_score += 1

        if self.check_winning_condition():
            print("Winning condition met.")
            self.congratulate_winner(winner)
        else:
            print("Winning condition not met.")

    def check_winning_condition(self):
        print('X:', self.player_one_score)
        return self.player_one_score >= 3 or self.player_two_score >= 3

    def congratulate_winner(self, winner):
        self.message = f"Congratulations! Player {winner} has won three times."
        print(f"Message set: {self.message}")
        

    def send_congratulations(self):
        return self.message

    def reset_scores(self):
        self.player_one_score = 0
        self.player_two_score = 0
        self.message = None
