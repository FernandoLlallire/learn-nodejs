const express = require('express');
const path = require('path'); 

exports.chat = (req,res)=>{
    res.sendFile(path.join(__dirname,'/../view/index.html'));
}