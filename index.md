---
layout: default
---

# Introduction

Small businesses and restaurants are the heart of a country's economy. We will be working with Yelp’s open-source dataset to provide customized recommendations and suggestions to consumers. This will help boutique business owners in bolstering their growth.

The review data has some key useful attributes that we intend to use: the star rating, actual text review, and “useful”, “cool”, or “funny” votes on the rating. We could include the “tips” data which has text recommendations from users on lesser-known advice about a restaurant, along with its “compliment” count to keep track of how many people appreciated the tip. 

One of the most interesting papers on the topic is by H. S. and R. Ramathmika. The researchers used NLP to label words with their parts of speech, mapped their frequencies, and used classification algorithms to predict sentiment. They achieved 75-79% accuracy through various techniques like different types of Naive Bayes, Logistic Regression, and Linear Support Vector Clustering.

# Problem Definition

As of today, recommendation systems for restaurants and small businesses aren’t as precise. Users select their preferred cuisine and are overloaded with skewed ratings and reviews. Google Maps, Gusto, OpenTable, etc. create a lot of confusion in the minds of consumers. For instance, people aren’t able to see which restaurant has nice vegetarian food, seafood, etc. Essentially, there is an information influx to the consumer in finding the right small business for the task at hand. With so many options, reviews, and ratings, finding the right match is so difficult and requires a lot of sorting and filtering.

# Methods

First, we can use NLP to label words and subsequently classify the sentiment of reviews based on the text content and word frequencies. NLTK (Natural Language Toolkit) is a powerful library for doing the same. Then, we can use Scikit-learn to perform Naive Bayes, Logistic Regression, or Linear Support Vector Clustering for classification.

Latent Dirichlet Allocation (LDA) can be used to classify text by category (cuisine for restaurants, industry for small businesses, etc.), and then similarity scores can be obtained between different categories. Lastly, geographical data can be used to find proximity to the user’s location. A combination of all these factors - reviews, similarity scores, and location - can help find the best fit for a particular user.

# Potential Results

TODO Devesh

# Responsibilities

TODO


# References

Burke, Robin. (2002). Hybrid Recommender Systems: Survey and Experiments. User Modeling and User-Adapted Interaction. 12. 10.1023/A:1021240730564. 

I.V., Shravan. (2016). Sentiment Analysis in Python using NLTK. OSFY - OpensourceForYou. 

S., H., & Ramathmika, R. (2019). Sentiment Analysis of Yelp reviews by machine learning. 2019 International Conference on Intelligent Computing and Control Systems (ICCS). https://doi.org/10.1109/iccs45141.2019.9065812 

Singh, Ruchi & Woo, Jongwook. (2019). Applications of Machine Learning Models on Yelp Data. Asia Pacific Journal of Information Systems. 29. 65-49. 10.14329/apjis.2019.29.1.35. 

Yelp Dataset. (n.d.). Retrieved October 6, 2022, from https://www.yelp.com/dataset/

