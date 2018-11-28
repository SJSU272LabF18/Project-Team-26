exports.search = function (req,res) {
  console.log("Query:" ,req.body)
    'use strict';
<<<<<<< HEAD
    var query1 = req.body.query;
    var stringArray = query1.split(" ");
    query1 = stringArray[0];
  
    const elasticsearch = require('elasticsearch');
    const esClient = new elasticsearch.Client({
      host: 'https://elastic:nbqpHxH5ErbXdkBNJK5YjbVt@1a909042abb2466fbd45863e6a6a6ee3.us-east-1.aws.found.io:9243',
=======
  
    const elasticsearch = require('elasticsearch');
    const esClient = new elasticsearch.Client({
      host: '127.0.0.1:9200',
>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651
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
<<<<<<< HEAD
            title: {
              query: query1,
=======
            Heading: {
              query: req.body.query,
>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651
              operator: 'and'
            }
          }
        }
      };
  
<<<<<<< HEAD
      console.log(`retrieving documents whose Heading matches phrase '${body.query.match.title.query}' (displaying ${body.size} items at a time)...`);
      search('app', body)
=======
      console.log(`retrieving documents whose Heading matches phrase '${body.query.match.Heading.query}' (displaying ${body.size} items at a time)...`);
      search('library', body)
>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651
      .then(results => {
        res.send(results);
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) console.log(`returned Heading Headings:`);
<<<<<<< HEAD
        results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title} - ${hit._id} (score: ${hit._score})`));
=======
        results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.Heading} (score: ${hit._score})`));
>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651
      })
      .catch(console.error);
    };
  
    test();


  }