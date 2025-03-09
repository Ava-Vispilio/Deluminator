# Deluminator

## Inspiration  
In today's digital age, misinformation spreads rapidly, influencing public opinion and decision-making. Inspired by the need for reliable information, we set out to develop a web-extension to help users identify deceptive content. Our goal was to leverage data science and machine learning to combat misinformation effectively.

## What it does



##  How We Built It  
Our approach combined data science, NLP, and machine learning to create a Fake News Detector:  

Data Collection 
 - We used fakeddit-multimodal-fake-news-classificatiom to create our model.

Preprocessing & Feature Engineering 
- Standard NLP techniques: text cleaning, tokenization, stop-word removal, and lemmatization.  
- Utilized TF-IDF vectorization, word embeddings (Word2Vec, GloVe), and Transformer-based embeddings (BERT embeddings).

Model Training & LLM Fine-Tuning  
- We started with baseline models like Logistic Regression for quick validation.  
- Moved to deep learning architectures such as LSTMs and CNNs for textual classification.  

Deployment & User Interaction  
- Added an scale to show the percentage as to whether its fake.

## Challenges we ran into

- Data Imbalance – Our dataset contained more real news than fake news, leading to biased predictions. We only us eone set of data to build the model.
- Evasive Fake News – Some fake articles were so well-written that even humans struggled to classify them. 
- Scalability Issues – Deploying a BERT-based model in a web extension required optimization techniques to reduce latency and memory usage.  
- Misinformation Arms Race – Fake news evolves daily, making it a never-ending battle. To address this, we explored semi-supervised learning*to continuously improve our model with new data.  

## Conclusion  
Building this Fake News Detector was an eye-opening experience that combined technical expertise with social impact. While our model is not perfect, it's a significant step towards a more informed digital society.  

### Future Improvements  
- Real-Time News Scraping – Automatically analyze trending news across platforms like Twitter and Facebook.  
- Explainable AI – Provide insights on why an article is flagged as fake using attention visualization.  
- Multi-Language Support – Extend the model to detect misinformation in multiple languages.  
- Deepfake Detection – Integrate AI-powered image and video verification for multimedia misinformation.
