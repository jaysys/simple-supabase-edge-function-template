from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/call_function', methods=['POST'])
def call_function():
    url = 'https://j~~~~~~~d.supabase.co/functions/v1/jworld'
    headers = {
        'Authorization': 'Bearer e~~~~~~~M'
    }
    data = request.json
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        print(">>>", response, response.json())
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Request failed', 'status_code': response.status_code, 'response': response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
