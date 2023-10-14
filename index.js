const fs = require('fs');// to read form json file
const http = require('http')//to create server
const url = require('url')


const replaceTemplate =require('../modules/replaceTemplate.js')//used to replace each json object with card html code



const tempCard = fs.readFileSync('../templates/template-card.html','utf-8')
const tempOverview = fs.readFileSync('../templates/template-overview.html','utf-8')
const tempProduct = fs.readFileSync('../templates/template-product.html','utf-8')
const data = fs.readFileSync('../dev-data/data.json','utf-8')
const dataObj = JSON.parse(data)


const server = http.createServer((req,res)=>
{
   
    
    const {query,pathname} = url.parse(req.url)
    const sm  = url.parse(req.url)
    console.log(sm)
    console.log(query)
   
    if(pathname === '/overview' || pathname === '/')
    {
      res.writeHead(200,{
        'Content-type':'text/html'//converts the raw html to static website
       })
       const cardsHTML = dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
       const output = tempOverview.replace('{%PRODUCT_CARDS}',cardsHTML)//replaces the  place holder {%PRODUCT_CARDS} with HTML code
      res.end(output)
    }
    else if(pathname === '/api')
    {
       res.writeHead(200,{
        'Content-type':'application/json'
       })
       res.end(data)
    
    }
      
    else if (pathname === '/product')
    {
      const product = dataObj[query[3]]
      const output = replaceTemplate(tempProduct,product)
      res.end(output)
    }
      
    
    else
    {
      res.writeHead(404,
        {
            'Content-type':'text/html'
        });
      res.end('<h1>Page Not Found</h1>')
    }
})
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening from port 8000')
})
