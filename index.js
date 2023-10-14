const fs = require('fs');
const http = require('http')
const url = require('url')
const slugify = require('slugify')
// const text=fs.readFileSync('input.txt','utf-8');
// console.log(text);
// const textOut = "\nHello world\n";
// fs.writeFileSync('output.txt',textOut);
////////////////////////////////////////
///FILES
// fs.readFile('start.txt','utf-8',(err,data1) =>
// {
//     fs.readFile(`${data1}.txt`,'utf-8',(err,data2)=>
//     {
//         console.log(data2);
//         fs.readFile('append.txt','utf-8',(err,data3)=>
//     {
//         console.log(data3);
//         fs.writeFile('final.txt',`${data2}\n${data3}`,'utf-8',err=>
//         {
//             console.log("Your file is written!!")
//         })
//     })
//     })

    
    
// })
// console.log("Will read this!");
////////////////////////////////////////
const replaceTemplate =require('../modules/replaceTemplate.js')



const tempCard = fs.readFileSync('../templates/template-card.html','utf-8')
const tempOverview = fs.readFileSync('../templates/template-overview.html','utf-8')
const tempProduct = fs.readFileSync('../templates/template-product.html','utf-8')
const data = fs.readFileSync('../dev-data/data.json','utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el=>slugify(el.productName,{lower:true}))
console.log(slugs)
const server = http.createServer((req,res)=>
{
   
    
    const {query,pathname} = url.parse(req.url)
    const sm  = url.parse(req.url)
    console.log(sm)
    console.log(query)
   
    if(pathname === '/overview' || pathname === '/')
    {
      res.writeHead(200,{
        'Content-type':'text/html'
       })
       const cardsHTML = dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
       const output = tempOverview.replace('{%PRODUCT_CARDS}',cardsHTML)
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