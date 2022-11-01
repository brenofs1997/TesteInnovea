
import express from 'express';

import cors from 'cors';


import fetch from 'node-fetch'

const app = express();

app.use(express.json());

app.use(cors(

))
app.use(
    (error , request , response , next) => {
        return response.json({
            status: "Error",
            message: error.message,
        });
    }
);

app.get('/', async (req, res) => {

    const q = req.query.q;
    const api_key = '0e0d63cab6fd464d91363af30b560a4b';
    const url = `https://newsapi.org/v2/everything/?q=${q}&apiKey=${api_key}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {

            const articles = data.articles

            res.send({ articles });
        })
        .catch(err => {
            res.send(err);
        });
});

app.listen(3333);