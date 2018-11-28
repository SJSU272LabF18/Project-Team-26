import pandas as pd
from summarize import get_summary


df = pd.read_csv('nlp/data/articles3.csv')
summary_list = []
index = 1
for index in range(0,len(df)):
	s = get_summary(df.iloc[index]['content'],5)
	print(index)
	if s == 'No Summary Found':
		s = "\""+s+"\""
		print(s)

	summary_list.append(s)

summary = pd.DataFrame(summary_list,columns=['summary'])
df = df.join(summary)
df.to_csv('nlp/data/a3_sum.csv',encoding='utf-8', index=False)