import pandas as pd
from summarize import get_summary

articles = ['nlp/data/articles1.csv','nlp/data/articles2.csv','nlp/data/articles3.csv']
df = pd.read_csv('nlp/data/articles2.csv')
summary_list = []
index = 1
for index in range(0,len(df)):
	try:
		summary_list.append(get_summary(df.iloc[index]['content'],5))
	except:
		print(index)
		summary_list.append("Summary Not Found")

summary = pd.DataFrame(summary_list,columns=['summary'])
df = df.join(summary)
df.to_csv('nlp/data/a2_sum.csv',encoding='utf-8', index=False)
print(df)