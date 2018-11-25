import json
import csv
import sys
csv.field_size_limit(sys.maxsize)

f = open('nlp/data/a1_sum.csv', 'r')
reader = csv.DictReader(f)

jsonoutput = 'nlp/data/a1_sum.json'
with open(jsonoutput, 'a') as f:
   for x in reader:
       json.dump(x, f)
       f.write(',\n')