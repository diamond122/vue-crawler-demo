import express from 'express';
import bodyParser from 'body-parser';
import htmlToJson from 'html-to-json';
import dotenv from 'dotenv';
import cors from 'cors';

import models, { connectDb } from './models/index.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client'));

const crawlPage = (url, res) => {
  htmlToJson.request(url, {
    'h1': ['h1', ($elem) => {
      return $elem.text();
    }],
    'h2': ['h2', ($elem) => {
      return $elem.text();
    }],
    'a': ['a', ($elem) => {
      return $elem.attr('href');
    }]
  }, (error, result) => {
    console.log("error:", error);

    if (error) return res.status(400).send({ error });

    console.log("result:", result);

    const newSite = new models.Site({ ...result, url });
    newSite.save((err) => {
      if (err) return res.status(400).send({ err });
      res.status(200).send({ url, ...result, createdAt: new Date() });
    });
  });
}

app.get('/sites', (req, res) => {
  const url = decodeURIComponent(req.params.url);
  models.Site.find({}, (err, sites) => {
    if (err) {
      return res.status(400).send([]);
    }
    res.status(200).send({ sites });
  })
});

app.get('/:url', (req, res) => {
  const url = decodeURIComponent(req.params.url);
  crawlPage(url, res);
}
);

connectDb().then(async () => {
  app.listen(3000, function () {
    console.log('App listening on port 3000!');
  });
});

export default app;
