from flask import Flask,request,Response
from flask_restful import Resource, Api
from nlp.spell_check import correct_phrase
from nlp.autocomplete import auto
from nlp.summarize import get_summary
import json
import sys

app = Flask(__name__)
api = Api(app)

class SpellCheck(Resource):

	def get(self):
		data = {}
		phrase = request.args.get('phrase')
		correct_tokens = correct_phrase(phrase)
		data['correct_phrase'] = " ".join(correct_tokens)

		return Response(response=json.dumps(data),status=200)

class AutoComplete(Resource):

	def get(self):
		data = {}
		phrase = request.args.get('phrase')
		auto_list = auto(phrase)

		data['suggestions'] = auto_list[0:10]
		return Response(response=json.dumps(data),status=200)

class Summarize(Resource):

	def post(self):
		text = request.json['content']
		summary_list = get_summary(text,5)
		data = {}
		data['summary'] = summary_list
		return Response(response=json.dumps(data),status=201)


api.add_resource(SpellCheck,"/spellCheck/")
api.add_resource(AutoComplete,"/autoComplete/")
api.add_resource(Summarize,"/summarize/")

def start_server(port):
	try:
		app.run(debug=True,host= '0.0.0.0',port=port)
	except:
		print("handling error")

if __name__ == '__main__':
	port = sys.argv[1]
	start_server(port)