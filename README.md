Google SpreadSheet JSON to 2-dimension Array
====================================================


1. Google Spreadsheet provides an API to query published spreadsheets over REST/JSON

2. The result JSON object is difficult to parse and convert into a HTML table. With this utility you can convert the JSON into a 2-dimension Array. It's possible to get a range to retrieve setting the initCell and endCell params. These params are in the form of column+row (e.g. "J7", "P80")

		sheet2array.get(JSON[,initCell][,endCell])

		var matrix = sheet2array.get(JSON);

3. This array is easy to loop and convert into a HTML table (with jquery, in this snippet)

		$("<table id='content'></table>").appendTo("body"); 

		for(var i=0;i<matrix.length;i++){
			$("<tr></tr>").appendTo("#content");
				if(matrix[i]){
					for(var k=0,y=matrix[i].length;k<y;k++){
						$("<td>"+(matrix[i][k] && matrix[i][k].value?matrix[i][k].value:"&nbsp;")+"</td>").appendTo("#content tr:last");
					}
				}
			}
		}  	