var Db = require('./dboperations.js');
var Produto = require('./produto.js');
const dboperations = require('./dboperations.js');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request } = require('http');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('./api' , router);
router.use((request, response, next)=>{
    console.log('middleware');
    next();
})

router.route('/.produtos').get((request, Response) =>{
   dboperations.getProdutos().then(result => {
    Response.json(result[0]);
    
   })


})
router.route('produtos').patch((request, response) =>{
    let produto = (request.body)

    dboperations.updtproduto(produto)(then =>response.status(204).json(result));


})

router.route('/produtos/:id').get((request , response)=>{
    dboperations.getproduto(request.paramns.id).then(result =>{
     response.json(result[0]);
    })
    })

    router.route('/produtos/:id').delete((request , response)=>{
        dboperations.delproduto(request.paramns.id).then(result =>{
         response.json(result[0]);
        })
        })

        router.route('produtos').post((request , response)=>{
            let produto ={...request.body}
          
            dboperations.Addproduto(produto).then(result=>{
                response.status(201).json(result);
        })
    })
var port = process.env.PORT || 8090
app.listen(port) 
console.log('Api de Produtos Rodando na porta  ' +port);