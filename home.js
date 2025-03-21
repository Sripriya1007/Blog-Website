const express = require('express');
const Router = express.Router();
const Club = require('../models/club')

Router.get('/',(err,res)=>{
    res.render('index')
})

Router.post('/add',(req,res)=>{
     const name = req.body.name;
     const email = req.body.email;

   const club = new Club({
       name,
       email
   })
   club.save(err=>{
       if(err){
           console.log("err is ")
       }else{
           res.redirect('/')
       }
   })
})

Router.get('/show',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;
       
        res.render('show',{
            students : docs
        })
        
    })
})


Router.get('/edit/:id',(req,res)=>{

    Club.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log("cant update")
        }else{
            res.render('edit',{studentdata:docs})
        }
    })
})

Router.post('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("err")
        }else{
            res.redirect('/show')
        }
    })
})

Router.get('/delete/:id',(req,res)=>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
         if(err){
             console.log("Err is")
         }else{
             console.log("Delted")
             res.redirect('/show')
         }
    })
})



module.exports = Router;