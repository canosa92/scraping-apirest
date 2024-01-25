const axios=require ('axios')
const cheerio =require ('cheerio')
const express =require('express')
const fs= require('fs')
const app =express()
const url = 'https://elpais.com/ultimas-noticias/'


app.get('/', async(req,res)=>{
    try{
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
         
        let noticias = [];
        $('.b-st_a article.c.c-d.c--m').each((index, element)=>{
            const title=$(element).find('h2').text();
            const img = $(element).find('img').attr('src');
            const parrafo=$(element).find('p').text();
            const link = $(element).find('a').attr('href');
        
            const noticia = {
                titulo: title,
                imagen: img,
                descripcion: parrafo,
                enlace: link,
            };
        noticias.push(noticia)
        })
        
       //res.json(noticias)
        fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));

    
        res.send(`
        ${noticias.map(noticia =>`<h1>${noticia.titulo}</h1>
        <img src = "${noticia.imagen}">
        <p>${noticia.descripcion}</p>
        <a href="${noticia.enlace}">${noticia.enlace}</a>`).join('')}
        `)
    
  
       
    }
    catch(error){
        console.log('Error interno')
        res.status(500).send('error de servidor')
    }
})

app.listen(3000,()=>{
    console.log('Puerto escucchando en http://localhost:3000')
})
