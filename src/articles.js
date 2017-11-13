let articles = [
  {
    id:1,
    author:"Scott",
    text:"This is the first article"
  },
  {
    id:2,
    author:"Mack",
    text:"This is the second article"
  },
  {
    id:3,
    author:"Marry",
    text:"This is the third article"
  }
]
let id = 4;

const reqHeader = (req, res) => {
  console.log('Request method        :', req.method)
  console.log('Request URL           :', req.url)
  console.log('Request content-type  :', req.headers['content-type'])
  console.log('Request payload       :', req.body)
}

const getArticles = (req, res) => {
  reqHeader(req, res);
  res.send(
    {'articles' : articles}
  )
}

const addArticle = (req, res) => {
  reqHeader(req, res);
  let newArticle = {id: id, author: req.body.author, text: req.body.text};

  if ( newArticle.author ){
    id++;
    articles.push(newArticle);
    res.send(newArticle);
  }
  else res.end()
}

const oneArticle = (req, res) => {
  reqHeader(req, res);
  let chosenArticle = articles.find(article => {
    return article.id == req.params.id
  })
  if( chosenArticle ) res.send(chosenArticle);
  else res.end();
}

module.exports = (app) => {
  app.get('/articles', getArticles);
  app.post('/article', addArticle);
  app.get('/articles/:id', oneArticle);
}
