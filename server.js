// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Adicione esta linha para trabalhar com caminhos de arquivos

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/google_forms_clone', { useNewUrlParser: true, useUnifiedTopology: true });

// Definindo o modelo do formulário
const FormSchema = new mongoose.Schema({
  title: String,
  questions: [String]
});

const Form = mongoose.model('Form', FormSchema);

// Rota para criar um novo formulário
app.post('/api/forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para obter todos os formulários
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.send(forms);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Servir o arquivo index.html quando a raiz for acessada
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

