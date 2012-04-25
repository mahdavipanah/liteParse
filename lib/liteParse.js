/*
 * liteParse
 *
 * Fast and easy template parser for javascript
 * 
 * Copyright Hamidreza Mahdavipanah
 * Licensed under the MOZILLA PUBLIC LICENSE Version 1.0
 * http://www.github.com/ihardware/liteParse
 */
var leftDelim =  '{',    
    rightDelim = '}';   
function parse (template , data){
    if(template === null || template === '')    
        return false;
    for(var key in data){
        val = data[key];
        if(typeof(val) === 'object')
            template = parsePair(key,val,template);
        else
            template = parseSingle(key,val,template);
    }
    return template;
}    
function parseSingle(key,val,str){
    var whatToRep = leftDelim+key+rightDelim;
    while(str.indexOf(whatToRep) != -1){
    	str = str.replace(whatToRep, val);
    }
    return str;
}
function parsePair(variable , data , str){    
    var match = matchPair(str,variable);
    if(match === false)
        return str;
    var string = '';
    for(row in data){
        var temp = match[1];
        row = data[row];
        for(key in row){
            val = row[key];
            if(typeof(val.splice) != 'function')
                temp = parseSingle(key,val,temp);
            else
                temp = parsePair(key,val,temp);
        }
        string+=temp;
    }
    return str.replace(match[0],string);
}
function matchPair(str,variable){    	
    var startString =leftDelim+variable+rightDelim,
    firstIndex = str.indexOf(startString);
    if(firstIndex == -1) 
        return false;
    var endString = leftDelim+'/'+variable+rightDelim;
    var secondIndex = str.indexOf(endString);
    var match = []; 
    match.push(str.slice(firstIndex,secondIndex+endString.length));
    match.push(str.slice(firstIndex+startString.length,secondIndex));
    return match;
}
function setDelimeters(left,right){
    leftDelim = left;
    rightDelim = right;
}    
function getLeftDelim(){
    return leftDelim;
}
function getRightDelim(){
    return rightDelim;
}

exports.parse = parse;
exports.setDelimeters = setDelimeters;
exports.leftDelim = getLeftDelim;
exports.rightDelim = getRightDelim;
