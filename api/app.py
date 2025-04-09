from flask import Flask, request, jsonify
from flask_cors import CORS
import os  # Import the os module to access environment variables
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd
import pickle
import json

# Load the model from a saved file
with open('../model/Project_model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('../model/encoder.pkl', 'rb') as file:
    encoder = pickle.load(file)

# Loading all symptoms
all_symptoms = pickle.load(open('all_symptoms', 'rb'))

app = Flask(__name__)
# Enable CORS for only the specified origin
CORS(app, resources={r"/api/*": {"origins": "https://moderndiseasedetector.onrender.com"}})

# function to have a similar disease
def similar(dis):
    data = pickle.load(open('data', 'rb'))
    similarity = pd.read_csv('similarity.csv', header=None)
    idx = data.index(dis)
    distances = similarity[idx]
    dis_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:4]
    final_list = []
    for i in dis_list:
        final_list.append(data[i[0]])
    return final_list

# Home Route
@app.route('/')
def hello_world():
    return 'Hello, World! This is a basic Flask app.'

# main route where all the computation occurs
@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json
    user_symptoms = data.get('selectedDiseases', [])
    print("Data received")

    # Process the data as needed
    inp = {col: 0 for col in all_symptoms}
    print("Process the data")

    for dis in user_symptoms:
        inp.update({dis: 1})
        
    inp = pd.DataFrame(inp, index=[0])
    ans = encoder.inverse_transform(model.predict(inp))[0]
    print(ans)
    
    print("Entering in similar ans")
    final_list = similar(ans)
    print(final_list)
    
    result = {'prediction': ans, 'similarDisease': final_list}
    return jsonify(result)

if __name__ == "__main__":
    # Use the provided PORT environment variable if available, otherwise use port 5000
    port = int(os.environ.get("PORT", 10000))
    app.run(debug=True, host="0.0.0.0", port=port)