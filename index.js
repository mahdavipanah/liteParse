var lp = require('./lib/liteParse'),
    path = require('path'),
    fs = require('fs');
exports.parse = lp.parse;
exports.setDelimeters = lp.setDelimeters;
exports.leftDelim = lp.leftDelim;
exports.rightDelim = lp.rightDelim;



var objLen = function(obj){
    if(!(typeof obj == 'object'))
    	return false;
    var len = 0;    
    for(var i in obj)
    	++len;
    return len;
}

var objMerge = function(a,b){
    if(a === null || b == null || !a || !b)	
    	return false;
    var obj = b;
    for(var i in a){
    	if(!obj[i])
    	    obj[i] = a[i];
    }
    return obj;
}

exports.fileParsing = function(options){
    if(options === null || objLen(options) === 0)
    	return false;   
    options.fileName = path.normalize(options.fileName);
    if(!path.existsSync(options.fileName)){
    	throw new Error('There is no file with path: '+options.fileName);
        return false;                
    }
    if(options.encoding === null || options.encoding === undefined || !options.encoding)
        options.encoding = 'utf8';
    if(options.return === null || options.return === undefined){
    	if(options.toFile !== undefined && options.toFile!==false){
    	    options.return = false;    		
    	} else 
    	    options.return = true;    	
    }   
    else
    	options.return = eval(options.return);
    if(!options.data)
    	options.data = {};
    if(options.dataFile !== undefined){
    	options.dataFile = path.normalize(options.dataFile);
    	if(!path.existsSync(options.dataFile)){
    	    throw new Error('There is no file with path: '+options.dataFile);
    	    return false;
    	}
    	var dataFileContent = fs.readFileSync(options.dataFile,options.encoding);
    	try{
    	    dataFileContent = JSON.parse(dataFileContent);
    	} catch(e){
    	    throw new Error('Bad JSON data : '+e.message);
    	    return false;
    	}
    } else{
    	var dataFileContent = {};
    }   
    var data = objMerge(dataFileContent,options.data),
        fileContent = fs.readFileSync(options.fileName,options.encoding),
        parsed = lp.parse(fileContent,data);    
    if(options.toFile !== undefined && options.toFile!==false){
    	options.toFile = path.normalize(options.toFile);
    	fs.writeFileSync(options.toFile,parsed,options.encoding);
    }			
    if(options.return ===true)
    	return parsed;
    else
    	return true;
};

