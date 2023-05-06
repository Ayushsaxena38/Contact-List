const express = require('express');

const port = 8000;

const db = require('./config/mongoose');//<=this has to be done before we create a express server which i done in following lines

const Contact = require('./model/contact');

const app = express();

const path = require('path');

app.use(express.urlencoded());

app.use(express.static('assets'));

// app.use(function(req,res,next){
//     console.log('this is a MiddleWare');
//     next();
// })

// this was used for creating the contact list without model or database
// var contactsList = [
//     {
//         name : "Ayush",
//         number :"969-061-2676" 
//     },
//     {
//         name : "Ashutosh",
//         number :"975-681-0065"
//     }
// ];

app.set('view engine','ejs');

app.set('views', path.join(__dirname ,'views'));


app.get('/',function(req,res){

    Contact.find({})
    .then((result)=>{
        console.log(result);
        return res.render('home',{
            title:"my Contact list",
            contacts_list:result
        })
    });
    
        
    
    
});

// param method 1 my method
// app.get('/delete-contact/:number', function(req,res){
//     console.log(req.params.number);
//     let ncl = {};
//     ncl = contactsList.filter((contact)=>{
//         return contact.number != req.params.number;
//     });
//     contactsList = ncl;
//     return res.redirect('back');

// })
// param method 2 my method
// app.get('/delete-contact/',function(req,res){
//     console.log(req.query);
//     let ncl = [];
//     ncl = contactsList.filter((contact)=>{
//         return contact.number != req.query.number;
//     })
//     contactsList = ncl;
//     return res.redirect('back');

// })

// coding ninja method , the better approach, this approach was used when we are doing the things without model or database
// app.get('/delete-contact/', function(req,res){
//     // first calculate the index which needs to be deleted
//     let contactIndex = contactsList.findIndex(contact => contact.number == req.query.number);
//     // console.log(contactIndex); just to check that if it is working
//     if(contactIndex != -1){
//         contactsList.splice(contactIndex,1);
//     }
//     return res.redirect('back');
// })

// this approach is use to delete a contact with the database
app.get('/delete-contact/',function(req,res){
    // first fetch the contact id which needs to be deleted
    let id = req.query.id;
    //
    Contact.findByIdAndDelete(id)
    .then((result)=>{
        console.log(result);
    })
    return res.redirect('/');
})


app.post('/creat-contact',(req,res)=>{
    // return res.redirect("/");
    // contactsList.push(req.body);
    Contact.create({
        name : req.body.name,
        number : req.body.number
    }
    // },function(err,newContact){
    //     if(err){
    //         console.log("error in creating the contact",err);
    //         return;
    //     }
    //     console.log("contact created=>",newContact);
    //     return res.redirect('back');
    // }
).then(function(result){
    console.log(result);
})
.catch((err)=>{
    console.log('error creating the new contact',err);
})

res.redirect('back');
})





app.listen(port , function(err){
    if(err){
        console.log("Error: ",err);
        return;
    }
    console.log('Server is up and listen to port : ',port);
    // console.log(app);
    console.log(__dirname);
})