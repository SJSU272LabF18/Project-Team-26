### NLP for Smarter Blog

The web application uses three main NLP concepts:
1. Summarize Content : We try to automatically summarize the blog or news content before they get stored in our servers.
2. Spell Check       : Our search results uses spell check modes that was trained on existing content to give you better suggestions.
3. Autocomplete      : Suggesting phrase completion to enhance user search experience.

#### Current installation and requrirements

1. python3
2. pip3
3. Python NLTK (NLP framework)

use `pip3 install -r requirements.txt` to install python dependencies.

#### Future work

1. Implement flask_restfull for search results.
2. Dockerise the nlp module along with flask api.
3. Deploy it in cloud for public visibility.

#### Starting the python Flask server

1. Use the following command to start the server : `python3 flask_server.py <port_number>` .

