import requests
from requests.auth import HTTPDigestAuth
import json

f = open('nlp/data/a1_sum.json','r')
url = "https://elastic:nbqpHxH5ErbXdkBNJK5YjbVt@1a909042abb2466fbd45863e6a6a6ee3.us-east-1.aws.found.io:9243/app/article/"
article_count = 1
payload = { 'username': 'elastic','pass': 'nbqpHxH5ErbXdkBNJK5YjbVt'}
auth = HTTPDigestAuth('elastic', 'nbqpHxH5ErbXdkBNJK5YjbVt')
for line in f:

	data = json.loads(line)
	resp = requests.post(url+str(article_count),json = data)
	print(resp)
	print(article_count)
	article_count += 1
