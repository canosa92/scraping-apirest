const express =require('express')
const fs= require('fs')
const app =express()
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let noticias = [];

// Leer datos desde el archivo JSON
function leerDatos() {
  try {
    const data = fs.readFileSync('noticias.json', 'utf-8');
    noticias = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo noticias.json:', error.message);
  }
}

// Guardar datos en el archivo JSON
function guardarDatos() {
  fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
}

app.get('/noticias',(req,res)=>{
    leerDatos();
    res.json(noticias)
})

app.post('/noticias',(req, res)=> {
    leerDatos();
    const nuevanoticia = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
    };
    noticias.push(nuevanoticia);
    guardarDatos();
    console.log(nuevanoticia)
    res.json(noticias);
})

app.delete('/noticias/:titulo',(req,res)=>{
    leerDatos()
    const titulo = req.params.titulo
    noticias=noticias.filter(noticia =>noticia.titulo !==titulo)
    res.json(noticias)
    console.log(titulo)
})


app.listen(3001,()=>{
    console.log('Puerto escucchando en http://localhost:3001/noticias')
})
