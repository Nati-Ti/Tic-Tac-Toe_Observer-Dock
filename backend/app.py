from flask import Flask, render_template, jsonify, request
from score import TicTacToeGame, ScoreObserver
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
game = TicTacToeGame()
score_observer = ScoreObserver()

@app.route('/')
def index():
    print("Index route accessed")
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def make_move():
    index = request.json.get('index')
    game.handle_click(index)
    
    winner = game.winner
    message = ''
    
    if winner:
        print('1 - Updating scores')
        score_observer.update(winner)
        
        if score_observer.message:
            print('2 - Winning condition met, sending congratulations')
            message = score_observer.send_congratulations()
            score_observer.reset_scores()
        else:
            print('No winning condition met.')

    response_data = {
        'board': game.board,
        'winner': game.winner,
        'xIsNext': game.x_is_next,
        'message': message
    }
    return jsonify(response_data)


@app.route('/ai_move', methods=['POST'])
def ai_move():
    data = request.json
    board = data.get('board')
    x_is_next = data.get('xIsNext')

    available_spots = [index for index, value in enumerate(board) if value is None]
    ai_move = random.choice(available_spots) if available_spots else None

    return jsonify({'aiMove': ai_move})


@app.route('/update_scores', methods=['POST'])
def update_scores():
    data = request.json
    winner = data.get('winner')
    score = data.get('score')
    return jsonify({"status": "success"})


@app.route('/reset', methods=['POST'])
def reset_game():
    game.reset_game()
    return jsonify({
        'board': game.board,
        'winner': game.winner,
        'xIsNext': game.x_is_next
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


#sudo docker run --rm --network host gamebackend    
#sudo docker run --rm --network host gamebackendserve
#sudo docker run --rm --network host gameclient