const http = require('http');

http.get('http://10.0.0.161:5000/autoComplete/?phrase=trump', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
   
  data1 = {"suggestions": ["bradshaw to trump\u2014boy", "to trump\u2014boy bye", "trumpster charged with", "religious trumpians suffer", "trumpians suffer from", "could be trumped", "he stop trumpism?", "exactly is trumpism?", "version of trumpism?", "trumpism: \u2018it\u2019s the"]};
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});