import requests

def test_predict_endpoint():
    url = "http://127.0.0.1:8000/predict/"
    payload = {"text": "This is a test sentence."}
    response = requests.post(url, data=payload)

    assert response.status_code == 200
    assert "prediction" in response.json()
    print("Prediction:", response.json())

if __name__ == "__main__":
    test_predict_endpoint()