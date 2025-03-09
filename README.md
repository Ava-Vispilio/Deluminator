# Deluminator
## Instruction to install 
step 1:  download the files, load unpacked to deluminator
step 2: insert your own api key also and custom search engine id in background.js
step 3: use the extension on the website

## Inspiration  
In today's digital age, misinformation spreads rapidly, influencing public opinion and decision-making. Inspired by the need for reliable information, we set out to develop a web-extension to help users identify deceptive content. Our goal was to leverage data science and machine learning to combat misinformation effectively.

## What it does
We built a chrome extension that detects the likelihood possibility of the contents of the active website being fake news using BERT from huggingface, while parsing the text to find the top 5 most repeated terms. The extension then searches the web with these terms and returns the top 3 most relevant results as links, allowing for the user to easily cross reference these 3 other sources, to have a better understanding of the matter and not fall for fake news.

##  How We Built It  
Our approach combined machine learning and Artificial Intelligence (NLP) and Google Custom Search API to create a Fake News Detector:  

Data Collection 
 - We used fakeddit-multimodal-fake-news-classificatiom to create our model.

Preprocessing & Feature Engineering 
- Standard NLP techniques: text cleaning, tokenization, stop-word removal, and lemmatization.  

Model Training & LLM Fine-Tuning  
- We started with baseline models like Simple Regression for quick validation.  
- We then move on to Binary Classificaiton
- Fine-tuning: Early stopping to minise loss, AdamW, CrossEntropyLoss (Binary) / BCEWithLogitsLoss (Regression).

Deployment & User Interaction  
- Added the percentage as to how likely it is to be fake news.
- Used Google Custom Search API to search the top 5 most repeated terms in the article and display the top 3 most relevant results as hyperlinks

## Challenges we ran into
- Data Imbalance – Our dataset contained more real news than fake news, leading to biased predictions. We only used one set of data to build the model.
- Evasive Fake News – Some fake articles were so well-written that even humans struggled to classify them. 
- Scalability Issues – Deploying a BERT-based model in a web extension required optimization techniques to reduce latency and memory usage.  
- Misinformation Arms Race – Fake news evolves daily, making it a never-ending battle. To address this, we explored semi-supervised learning*to continuously improve our model with new data.

## Conclusion  
Building this Fake News Detector was an eye-opening experience that combined technical expertise with social impact. While our model is not perfect, it's a significant step towards a more informed digital society.  

## Future Improvements  
- Real-Time News Scraping – Automatically analyze trending news across platforms like Twitter and Facebook.  
- Explainable AI – Provide insights on why an article is flagged as fake using attention visualization.  
- Multi-Language Support – Extend the model to detect misinformation in multiple languages.  
- Deepfake Detection – Integrate AI-powered image and video verification for multimedia misinformation.
