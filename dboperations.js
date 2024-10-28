var config = require('./dbConfig');
const sql = require('mssql');


async function GetProdutos(params) {
    try{
let poul = await sql.Connect(config);
let lojas = await poul.request().query("Select  *  from Produtos");
return lojas.recordsets;

    }
    catch (error){
     console.log(error);
    }
}

async function updtproduto(produto) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('Id', sql.Int, produtoId)
            .input('nome', sql.VarChar, produto.nome)
            .input('Preco', sql.Decimal, produto.Preco) // Ajuste de tipo conforme necessário
            .input('descrição', sql.VarChar, produto.descrição)
            .input('Quantidade', sql.Int, produto.Quantidade)
            .input('Avaliação', sql.Decimal, produto.Avaliação) // Ajuste de tipo conforme necessário
            .input('Categoria', sql.VarChar, produto.Categoria)
            .query(`UPDATE [dbo].[Produto]
                    SET 
                        [nome] = @nome,
                        [Preco] = @Preco,
                        [descrição] = @descrição,
                        [Quantidade] = @Quantidade,
                        [Avaliação] = @Avaliação,
                        [Categoria] = @Categoria
                    WHERE ID = @Id`);

       

      return loja.recordsets
            }
     catch(error){
        console.log("error");
     }
     
    }
     async function getproduto(produtoId) {
        try{
            let poul = await sql.Connect(config);
            let lojas = await poul.request()
            .input('@input_Parameter' , sql.int , produtoId)
            .query("Select  *  from produto  WHERE ID = @input_Parameter ");
            return lojas.recordsets;
            
                }
                catch (error){
                 console.log(error);
                }
            }
            async function Delproduto(produtoId) {
                try{
                    let poul = await sql.Connect(config);
                    let lojas = await poul.request()
                    .input('@input_Parameter' , sql.int , produtoId)
                    .query("DELETE from [dbo].[produtos] WHERE ID = @input_Parameter ");
                    return lojas.recordsets;
                    
                        }
                        catch (error){
                         console.log(error);
                        }
                    }
                    async function Addproduto(produto) {
                        try {
                            let pool = await sql.connect(config);
                            let lojas = await pool.request()
                            .query(`INSERT INTO [dbo].[produtos] 
                                (
                                [Id], 
                                [nome], 
                                [Preco], 
                                [descricao], 
                                [Quantidade], 
                                [Avaliacao], 
                                [Categoria]
                                )
                                VALUES (
                                '${produto.Id}', 
                                '${produto.nome}, 
                                '${produto.Preco}', 
                                '${produto.descrição}, 
                                '${produto.Quantidade},
                                '${produto.Avaliação}, 
                                '${produto.Categoria}'
                             ) `);
            
                            
                            
                            return lojas.recordsets;
                        } catch (error) {
                            console.log("Erro ao adicionar produto:", error);
                            throw error;
                    

                        }}


   module.exports = {
      GetProdutos : GetProdutos,
      updtproduto : updtproduto,
      getproduto : getproduto,
      Delproduto : Delproduto,
      Addproduto : Addproduto
    }



