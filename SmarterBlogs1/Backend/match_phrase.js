exports.search = function (req,res) {
  console.log("Query:" ,req.body)
    'use strict';
  
    const elasticsearch = require('elasticsearch');
    const esClient = new elasticsearch.Client({
      host: '127.0.0.1:9200',
      log: 'error'
    });
  
    const search = function search(index, body) {
      return esClient.search({index: index, body: body});
    };
  
    // only for testing purposes
    // all calls should be initiated through the module
    const test = function test() {
      let body = {
        size: 105,
        from: 0,
        query: {
          match: {
            Heading: {
              query: req.body.query,
              operator: 'and'
            }
          }
        }
      };
  
      console.log(`retrieving documents whose Heading matches phrase '${body.query.match.Heading.query}' (displaying ${body.size} items at a time)...`);
      search('library', body)
      .then(results => {
        res.send(results);
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) console.log(`returned Heading Headings:`);
        results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.Heading} (score: ${hit._score})`));
      })
      .catch(console.error);
    };
  
    test();


  }