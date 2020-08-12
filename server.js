const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

//get Random quotes. 
app.get('/api/quotes/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(quotes)
    })
});


//get all quotes attributed to person 

app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person){
        res.send({
            quotes: quotes
        })
    }
        const filteredQuotes = quotes.filter((quote) => {
            return quote.person == req.query.person;
        });
        res.send({
            quotes: filteredQuotes
        })
   
})

    app.post("/api/quotes",(req,res,next)=>{
     
      if(req.query.quote && req.query.person){
        quotes.push(req.query)
       
        res.status(201).send(req.query);
      }
      else{
        res.status(400).send();
      }
    })