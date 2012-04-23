/*
 * liteParse
 *
 * Fast and easy template parser for javascript
 * 
 * Copyright Hamidreza Mahdavipanah
 * Licensed under the MOZILLA PUBLIC LICENSE Version 1.0
 * http://www.github.com/ihardware/liteParse
 *
 */
var liteParse =
{
    leftDelim : '{',
    rightDelim : '}',    
    parse : function(template , data){
        if(template === null || template === '')    
            return false;
        for(var key in data){
            val = data[key];
            if(typeof(val) === 'object')
                template = this.parsePair(key,val,template);
            else
                template = this.parseSingle(key,val,template);
        }
        return template;
    },
    setDelimeters : function(left,right){
        this.leftDelim = left;
        this.rightDelim = right;
    },
    parseSingle : function(key,val,str){
    	var whatToRep = this.leftDelim+key+this.rightDelim;
    	while(str.indexOf(whatToRep) != -1){
    	   str = str.replace(new RegExp(whatToRep) , val);
    	}
    	return str;
    },
    parsePair : function(variable , data , str){    
        var match = this.matchPair(str,variable);
        if(match === false)
            return str;
        var string = '';
        for(row in data){
            var temp = match[1];
            row = data[row];
            for(key in row){
                val = row[key];
                if(typeof(val.splice) != 'function')
                    temp = this.parseSingle(key,val,temp);
                else
                    temp = this.parsePair(key,val,temp);
            }
            str+=temp;
        }
        return str.replace(match[0],string);
    },
    matchPair : function(str,variable){    	
        var startString =this.leftDelim+variable+this.rightDelim,
        firstIndex = str.indexOf(startString);
        if(firstIndex == -1) 
            return false;
        var endString = this.leftDelim+'/'+variable+this.rightDelim;
        var secondIndex = str.indexOf(endString);
        var match = []; 
        match.push(str.slice(firstIndex,secondIndex+endString.length));
        match.push(str.slice(firstIndex+startString.length,secondIndex));
        return match;
    }
}
