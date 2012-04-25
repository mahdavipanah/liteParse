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

> For accessing liteParse from command line via `litepar` command add `-g` when installing liteParse with npm


## Usage
There are two ways to use liteParse: through the command line interface, or by requiring the liteParse module in your own code


### Using liteParse from command line
You can use liteParse to parse any template files you have with some data that are saved in another file

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

we want to parse the toparse.tpl file with the data s wich are stored in data.json file
```bash
$ [sudo] litepar parse toparse.tpl data.json
```
And then the parsed html page will print in command line interface <br />
To store the parsed html in a file, Do :
```bash
$ [sudo] litepar parse toparse.tpl data.json -t 'name-of-a-file-to-store'
```
If you dont want to see the parsed data that will save in the file, Do :
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
    -l, --leftdelim <value>   Set the left delimeter
    -r, --rightdelim <value>  Set the right delimeter


```
