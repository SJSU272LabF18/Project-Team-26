import pandas as pd

def get_title():

	articles = ['nlp/data/articles1.csv','nlp/data/articles2.csv','nlp/data/articles3.csv']
	for artcile in articles:
		df = pd.read_csv('nlp/data/articles2.csv')
		for index in range(0,len(df)):
				yield df.iloc[index]['title']



f = open('nlp/test.txt','w')
for line in get_title():
	f.write(str(line))
	f.write("\n")