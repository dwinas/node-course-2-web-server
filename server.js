const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const app = express();

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', ()=>{

    return new Date().getFullYear()
})

hbs.registerHelper('updating', ()=>{

    return 'Page is updating we will be back soon'
})

hbs.registerHelper('screamIt', (text) =>{

    return text.toUpperCase()
})

app.set('view engine', 'hbs');



app.use((req, res, next) =>{
    const now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFileSync('server.log', log +'\n')
    
   next();
})

app.use((req, res, next) =>{

    res.render('maintenance.hbs')

    
})

app.use(express.static(__dirname + '/html'));

app.get('/', (req, res)=>{

    res.send('<h1>Hello Express!!</h1>');
})

    
    app.get('/about', (req, res) =>{

        res.render('about.hbs', {

            title: 'Mano super puslapis',
           
        })

    })


    app.get('/home', (req, res) =>{

        res.render('home.hbs',{

            title: 'Home page',
            welcome: 'Hello my darling you are the best'
        })
    })


    app.get('/bad', (req, res)=>{

        res.send({error: 'Some error apper'})
    })

    app.listen(3000, () =>{

        console.log('Server is up on port 3000')
    })
