const express = require('express')
const app = express()

app.use(express.json());

let personlist = []

const port = 3000


app.get('/visualizar', (req, res) => {
    res.send(personlist)
})

app.post('/cadastrar', (req, res) => {
    const { name, age } = req.body;
    let id = personlist.length;
    personlist.push({id, name, age})
    res.send(`Usuário recebido!!, ${id} ${name} ${age}`)
})

app.get('/visualizar/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.send(personlist[id])
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/deletar:id', (req, res) =>{
    const {id} = req.params;
    if(personlist[id - 1]){
       personlist.splice(id - 1, 1);
       res.send('Usuário deletado com sucesso')
    } else {
        res.status(404).send('Usuário não encontrado');
    }

    
});

app.put('/atualizar/:id', (req, res)=>{
    const {id} = req.params;
    const {name, age} = req.body;
    try{
    personlist[id - 1] = {id, name, age};
    res.send(`Usuário atualizado! "${id}\nNovo nome: ${name} \nNova idade: ${age} `);
    }catch(err){
        res.send("Usuário não encontrado")
    }    
})