# liteParse !
Fast and easy template parser for javascript 


##features

- Fast
- Easy
- File parsing
- Uses JSON for templating data
- Accessing from command line
- Fast!

## installation

### Installing npm (node package manager)
``` bash
   curl http://npmjs.org/install.sh | sh
```

### Installing liteParse
```bash
  $ [sudo] npm install liteParse -g
```

> For accessing liteParse from command line via `litepar` command, Add `-g` when installing liteParse with npm


## Usage
There are two ways to use liteParse: through the command line interface, or by requiring the liteParse module in your own code


### Using liteParse from command line
You can use liteParse to parse any template files you have, With some data s that are saved in another file

**example** : 
there is a file named `toparse.tpl` :
```html
<html>
    <body>
    	<ul>
    	    {students}
    	    	<li>
    	    	    Name  : {name} <br />
    	    	    Grade : {grade}
    	    	</li>
    	    {/students}
    	</ul>
    </body>
</html>
```

and there is another file named `data.json` :
```JSON
{
    "students" : [
    	{
    	    "name" : "John",
    	    "grade" : "6"
    	},
    	{
    	    "name" : "micheal",
    	    "grade" : "8"
    	}
    ]
}
```

we want to parse the toparse.tpl file with the data s which are stored in data.json file
```bash
$ [sudo] litepar parse toparse.tpl data.json
```
And then the parsed html page will print in command line interface <br />
To store the parsed html in a file, Do :
```bash
$ [sudo] litepar parse toparse.tpl data.json -t 'name-of-a-file-to-store'
```
If you want to see the parsed html that will save in the file, Do :
```bash
$ [sudo] litepar parse toparse.tpl data.json -t 'name-of-a-file-to-store' -p
```
#### help of liteParse command line
``` bash
$ litepar --help

  Usage: litepar parse <file> <data file> [options]

  Commands:

    parse <file> <datafile>
    Parse a file with the JSON data of the given data file

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -s, --show                Show the parsed string
    -e, --encoding <value>    File parsing encoding
    -t, --tofile <value>      Save the parsed file to another file
    -l, --leftdelim <value>   Determine the left delimeter
    -r, --rightdelim <value>  Determine the right delimeter


```

> Delimeters : the character or string which liteParse uses for parsing, in `{students}` the character `{` is left delimeter and `}` is right delimeter. These two characters are default delimeters
> For changing the delimeters use `-l 'delim'` and '-r 'delim'' commands.

### Using liteParse as Node.js module
A good example for understanding everything :
``` javascript
var lp = require('liteParse');

/**
*liteParse have 5 functions :
*/

// -------------------------------------------------------------------------------------------

/**
*  1- liteParse.parse
*
*  @param template <string>  the template to parse
*  @param data <object> data s for parsing the template
*/

var parsedTemplate1 = lp.parse('my name is {myname} and your name is {yourname}' , 
    {
    	myname : 'Hamidreza' ,
    	yourname 'Juliet'
    }
);

/* parsedTemplate1 =   'my name is Hamidreza and your name is Juliet' */

// -------------------------------------------------------------------------------------------

/**
*  2- liteParse.setDelimeters
*  
*  @param left <string> Left delimeter
*  @param right <string> Right delimeter
*/

lp.setDelimeters('{{' , '}}');

var parsedTemplate2 = lp.parse('my name is {{name}}' , {name : 'Ryan'});

// parsedTemplate2 = 'my name is Ryan'

// -------------------------------------------------------------------------------------------


/**
*  3- leftDelim  4- rightDelim
*
*  Return the current left and right delimeters
*/ 

var nowLeftDelim  = lp.leftDelim();
// nowLeftDelim = '{{'

lp.setDelimeters('{' , '}');

var nowRightDelim = lp.rightDelim();
// nowRightDelim = '}'

// -------------------------------------------------------------------------------------------


/**
* 5- fileParsing
*
* @param options <object> options for templating a file
*/

var parsedTemplate = lp.fileParsing({

    fileName : '../exam.tpl' ,
    dataFile : '../data.json' , // The file should contains a valid JSON
    return : 'true' , // Will return the parsed template as a string    Default = true
    toFile : './out.html' // Save the parsed template to a file
    encoding : 'utf8' // Encoding type for reading and writing files    Default = 'utf8'
    data : {  // Some data directly --->  if datafile has set, The data s of datafile will merge with this data object
    	name : 'Node.js'  
    }
    
});
// -------------------------------------------------------------------------------------------
```
