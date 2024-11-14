const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

//Schema de usuário
const usuarioSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

//conexão ao MongoDB
async function conectarAoMongo() {
  await mongoose.connect(`mongodb+srv://dantefernandessilvalima:Pardo123@cluster0.cpeu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

app.post('/signup', async (req, res) => {
  try{
      const login = req.body.login
      const password = req.body.password
      const passwordCriptografada = await bcrypt.hash(password, 10)
      const usuario = new Usuario({login: login, password: passwordCriptografada})
      const respMongo = await usuario.save()
      console.log(respMongo)
      res.end()
      res.status(201).end()
  }
  catch(e) {
      console.log(e)
      res.status(409).end()
  }
})

// Endpoint de login (apenas para usuarios existentes)
app.post('/login', async (req, res) => {
  const { login, password } = req.body
  // Verificando o usuário
  const usuarioExiste = await Usuario.findOne({ login: login })
  if (!usuarioExiste) {
    return res.status(401).json({ mensagem: "Login inválido" })
  }
  // Verificando a senha
  const passwordValida = await bcrypt.compare(password, usuarioExiste.password)
  if (!passwordValida) {
    return res.status(401).json({ mensagem: "Senha inválida" })
  }


  // Gerando o token
  const token = jwt.sign(
    { login: login },
    "chave-segura",
    { expiresIn: "1h" }
  )

  res.status(200).json({ token: token })
})

// Iniciando o servidor
app.listen(3000, () => {
  try {
    conectarAoMongo()
    console.log("Servidor em execução e conexão com o banco OK");
  } catch (e) {
    console.log('Erro de conexão:', e)
  }
})

