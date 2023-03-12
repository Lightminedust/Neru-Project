from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/dataForm', methods=['POST'])
def data_form():
    form_data = request.get_json()

    # Écrire les données JSON dans un fichier
    with open('../data/data.json', 'w') as f:
        json.dump(form_data, f)

    # Répondre avec un message de confirmation
    response = {'message': 'Les données ont été enregistrées avec succès !'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
