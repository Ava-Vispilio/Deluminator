# Deluminator

## Inspiration  
In today's digital age, misinformation spreads rapidly, influencing public opinion and decision-making. Inspired by the need for reliable information, we set out to develop a web-extension to help users identify deceptive content.   

Like the namesake item in Harry Potter, we hope to combat misinformation by shining some light into the murkier parts of the internet that seek to mislead and misinform others

## What it does
This chrome extension achieves two goals:
1. It scans a website and determines whether it is likely to be fake news or not
2. If it is indeed fake news, it will recommend 3 other sources for the user to cross-reference

Goal #1 is achieved using a pre-trained BERT model validated using the FAKEDDIT DATASET  
Goal #2 is achieved by parsing the text to find the top 5 most repeated terms, then searching the web to return the top 3 more relevant results as links

##  How We Built It  
Our approach combines ML/AI in the form of NLP and the Google Custom Search API in an extension  

Data Collection 
 - We used the Fakeddit Dataset to validate our model
 - It is based on a collection of Reddit posts and headlines

Preprocessing & Feature Engineering 
- Standard NLP techniques: Text cleaning, tokenization, embedding  

Model Training & LLM Fine-Tuning  
- We started with Simple Regression to validate the text-preprocessing and training steps  
- Once that was working, we switched to Binary Classification (which is what the extension uses)
- Fine-tuning: Early stopping to minise loss, AdamW, CrossEntropyLoss (Binary) / BCEWithLogitsLoss (Regression)

Deployment & User Interaction  
1. Clone the repo and load it as an unpacked extension into Chrome
2. Insert your own Google Custom Search API (GET IT HERE) and ID into background.js
3. Start using the extension! 

## Challenges we ran into
- Data Imbalance – Our dataset contained more real news than fake news, leading to biased predictions. Additionally, only used one set of data was used to train the model
- Evasive Fake News – Some fake articles were so well-written that even humans struggled to classify them 
- Scalability Issues – Deploying a BERT-based model in a web extension required optimization techniques to reduce latency and memory usage 
- Misinformation Arms Race – Fake news evolves daily, making it a never-ending battle. To address this, we explored semi-supervised learning*to continuously improve our model with new data

## Conclusion  
Building this Fake News Detector was an eye-opening experience that combined technical expertise with social impact. While our model is not perfect, it's a significant step towards a more informed digital society  

## Future Improvements  
- Real-Time News Scraping – Automatically analyze trending news across platforms like Twitter and Facebook  
- Explainable AI – Provide insights on why an article is flagged as fake using attention visualization  
- Multi-Language Support – Extend the model to detect misinformation in multiple languages  
- Deepfake Detection – Integrate AI-powered image and video verification for multimedia misinformation

---

## Proof of Concept
The BERT folder contains the necessary files to build your own model and validate it  

Here's how to set it up:
1. Clone the folder
2. cd into the directory
3. Set up a pyvenv environment in the directory
```
python -m venv [env name]
```
4. Install dependencies 
```
pip install -r requirements_with(out)_GPU.txt
```
5. Run jupyterlab to access the notebook
```
jupyter-lab
```

Once inside, you can edit the following options:
- test_size: This affects the portion of the dataset used for training and validation. The dataset starts with around 870,000 values, so 0.5 would give you about 435,000 values
- num_epochs: This affects how many times the dataset is run through the model. A higher value generally means better performance

After running the model, it will be saved in your directory as model.pt. Feel free to replace the path to the model with your own within the API script to use your own model to evaluate webpages!
