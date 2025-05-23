const express = require("express") 
const router = express.Router()
const cors = require('cors')
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')

const app = express()
const porta = 333
app.use(express.json())
app.use(cors())


//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  }catch (erro) {

  }
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try {
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)  
  } catch (erro) {
    console.log(erro)
  }
}
 
//PATCH
async function corrigeMulher(request, response) {
  try {
      const mulherEncontrada = await Mulher.findById(request.params.id)

      if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
      }

      if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
      }

      if (request.body.imagem) {
        mulherEncontrada = request.body.imagem
      }

      if (request.body.citacao) {
        mulherEncontrada = request.body.citacao
      }
    
      const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
      
      response.json(mulherAtualizadaNoBancoDeDados)

  } catch (error) {
    console.log(erro)
  }
}

//DELETE
async function deletaMulher(request, response) {
  try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})
  } catch (error) {
      console.log(erro)    
  }
}


function mostraPorta() {
  console.log("Servidor criado e rodando na porta:", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))
app.use(router.delete('/mulheres/:id', deletaMulher))

app.listen(porta, mostraPorta)