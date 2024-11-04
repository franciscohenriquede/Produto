var config = require('./dbConfig');
const sql = require('mssql');


async function GetProdutos() {
    try{
let pool = await sql.connect(config);
let lojas= await pool.request().query("Select  *  from Carros");
return lojas.recordsets;

    }
    catch (error){
     console.log(error);
    }
}


async function Updtcarro(carro) {
    try{
          let pool = await sql.connect(config);
          let loja = await pool.request()
          .input('input_parameter', sql.Int , carro.Id)
          .query(`UPdate [dbo].[Carros]
           SET
            [Nome] = '${carro.Nome}',
            [Preco] = '${carro.Preco}',
            [Quantidade] ='${carro.Quantidade}',
            [Descricao] ='${carro.Descricao}',
            [Categoria] ='${carro.Categoria}',
            [Avaliacao] ='${carro.Avaliacao}'
              WHERE ID = @input_parameter
               `);
                return loja.recordsets



    }
    catch(error){

        console.log(error);
    }
}

     async function getProduto(carroId) {
        try{
            let pool = await sql.connect(config);
            let lojas = await pool.request()
            .input('input_parameter' , sql.Int , carroId)
            .query("SELECT  *  from Carros  WHERE Id = @input_Parameter ");
            return lojas.recordsets;
            
                }
                catch (error){
                 console.log(error);
                }
            }
            async function delproduto(carroId) {
                try{
                    let pool = await sql.connect(config);
                    let lojas = await pool.request()
                    .input('input_parameter' , sql.Int , carroId)
                    .query("DELETE  from [dbo].[Carros] WHERE ID = @input_parameter");
                     return lojas.recordsets;
                    
                        }
                        catch (error){
                         console.log(error);
                        }
                    }
                    async function Addproduto(carro) {
                        try {
                            let pool = await sql.connect(config);
                            let lojas = await pool.request()
                                .input('Preco', sql.Int, carro.Preco)
                                .input('Quantidade', sql.Int, carro.Quantidade)
                                .input('Nome', sql.NVarChar, carro.Nome)
                                .input('Id', sql.Int, carro.Id)
                                .input('Avaliacao', sql.NVarChar, carro.Avaliacao)  // Corrigido de Avaliação para Avaliacao
                                .input('Descricao', sql.NVarChar, carro.Descricao)
                                .input('Categoria', sql.NVarChar, carro.Categoria)
                                .query(`INSERT INTO [dbo].[Carros] 
                                    ([Preco], [Quantidade], [Nome], [Id], [Avaliacao], [Descricao], [Categoria]) 
                                    VALUES (@Preco, @Quantidade, @Nome, @Id, @Avaliacao, @Descricao, @Categoria)`);
                    
                            return lojas.recordsets;
                        } 
                        catch (error) {
                            console.log(error);
                        }
                    }
                    

                        


   module.exports = {
      GetProdutos : GetProdutos,
      Updtcarro : Updtcarro,
      getProduto : getProduto,
      delproduto : delproduto,
      Addproduto : Addproduto
    }



