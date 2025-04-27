from API import get_prediction

# path to the trained model
model_path = r"models/Malicious_URL_Prediction.h5"

# input url
url = "www.tesla.com/"

# prediction
prediction = get_prediction(url, model_path)
print("Prediction:", prediction)
