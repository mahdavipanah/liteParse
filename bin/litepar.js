#!/usr/bin/env node

var program = require('commander'),
    lp = require('../index.js');
require('colors');
program.version('1.1.1')
       .usage('parse <file> <data file> [options]')
       .option('-s, --show','Show the parsed string')
       .option('-e, --encoding <value>','File reading and writing encoding') 
       .option('-t, --tofile <value>','Save the parsed file to another file')
       .option('-l, --leftdelim <value>','Determine the left delimeter')
       .option('-r, --rightdelim <value>','Determine the right delimeter')
;

program.command('parse <file> datafile <datafile>')
       .description('Parse a file with the JSON data of the given data file')
       .action(function(file,datafile){ 
       	   if(program.show === undefined)
       	   	program.show = false;
       	   if(!program.tofile)
       	   	program.show = true;
           var result = '';        
           if(program.leftdelim)   
           	lp.setDelimeter(program.leftdelim,lp.rightDelim());
           if(program.rightDelim)
           	lp.setDelimeter(lp.leftDelim(),program.rightdelim)
           try {
               result = lp.fileParsing({               
                 "fileName" : file,                                
                 "dataFile" : datafile,
                 "return" : program.show,
                 "toFile" : program.tofile,
                 "encoding" : program.encoding
               });
           } catch(e) {
               console.log(e.message.red);
               return false;
           }
           if(result === true)
           	result = file.inverse + ' parsed with the JSON data of the file '.green+datafile.inverse;
           if(program.tofile)
           	result += ' to '.green+'---->'.rainbow+' '+program.tofile.inverse;
           console.log(result);
       })
;            

program.parse(process.argv);    

