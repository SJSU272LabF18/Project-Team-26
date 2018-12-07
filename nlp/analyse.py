import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

def clean_data_actual():

	projects = []
	status_value = {'Rejected':-1,'Starred':0,'Approved':1}

	with open('nlp/Untitled.json') as f:
		for line in f:
			row = []
			data = json.loads(line)

			row.append(data['idea_id']['$numberInt'])
			row.append(data['title'])
			row.append(data['abstract'])
			row.append(status_value[data['status']])
			row.append(data['like_count']['$numberInt'])
			row.append(data['dislike_count']['$numberInt'])

			#print(str(idea_id)+" "+data['title']+" "+str(status_value[data['status']])+" "+str(like_count)+" "+str(like_count))
			projects.append(row)

	df = pd.DataFrame(projects,columns=['idea_id','title','abstract','status','like_count','dislike_count'])
	return df

def get_recommendations(df,title,indices,cosine_sim,n_rec=3):
	idx = indices[title]
	sim_scores = list(enumerate(cosine_sim[idx]))
	sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
	sim_scores = sim_scores[1:(n_rec+1)]

	movie_indices = [i[0] for i in sim_scores]
	return df['title'].iloc[movie_indices]

def get_param():

	df = clean_data_actual()
	#print(df['abstract'].head())
	tfidf = TfidfVectorizer(stop_words='english')
	tfidf_matrix = tfidf.fit_transform(df['abstract'])
	#print(tfidf_matrix.shape)
	cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
	indices = pd.Series(df.index, index=df['title']).drop_duplicates()

	return df,cosine_sim,indices

df,cosine_sim,indices = get_param()
df = get_recommendations(df,"Food Recommender",indices,cosine_sim)

print(df.values.tolist())