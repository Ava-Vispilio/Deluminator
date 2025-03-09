from fastapi import FastAPI, Form
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import logging
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app instance
app = FastAPI()

# Add CORS middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize logging
my_logger = logging.getLogger()
my_logger.setLevel(logging.DEBUG)
logging.basicConfig(level=logging.DEBUG, filename='logs.log')

# Load tokenizer and model
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Load BERT model with a classification head
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)
model.load_state_dict(torch.load("model_binary_83.pt", map_location="cpu"))
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

@app.post("/predict/")
async def predict(
    text: str = Form(...)
):
    """Perform inference on a single piece of text."""
    # Tokenize the input text
    inputs = tokenizer.encode_plus(
        text, add_special_tokens=True,
        return_tensors="pt",
        max_length=80,
        truncation=True,
        padding="max_length"
    )

    # Extract input_ids and attention_mask
    input_ids, attention_mask = inputs["input_ids"].to(device), inputs["attention_mask"].to(device)

    # Perform inference
    with torch.no_grad():
        output = model(input_ids, attention_mask)
        logits = output.logits  # Ensure logits are available

    # Apply softmax to get probabilities
    probabilities = torch.softmax(logits, dim=1)

    # Get the predicted class
    _, prediction = torch.max(probabilities, dim=1)
    prediction_class = "Class 1" if prediction.item() == 1 else "Class 0"

    # Get the probability for class 1 (fake news)
    fake_news_prob = probabilities[0][1].item()

    return {
        "prediction": prediction_class,
        "probability": fake_news_prob
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
