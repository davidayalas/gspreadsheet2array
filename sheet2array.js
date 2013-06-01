var sheet2array = {

  setted : {},
    
  /*
  * Get the num order for a spreadsheet column ("A", "AB", "BC")
  *
  * @param {String} l
  * @return {Number}
  */
  getColNumber : function(l){
    if(!this.setted[l]){
      var ncols = 25;
      var col = 0;
      for(var i=0;i<l.length;i++){
        if(i<l.length-1){
          col = ((l.charCodeAt(i)-65)+1)*ncols;
        }else{
          col += (l.charCodeAt(i)-65)+1;
        }
      }
      this.setted[l] = col-1;
    }
    return this.setted[l];
  },

  /*
  * Get col and row for an id like "AC12" --> AC = column, 12 = row
  *
  * @param {String} l
  * @return {Object} col, row
  */
  getColRow : function(c){
    var col="",row=0;i=0;
    while(isNaN(c.slice(i,i+1))){
      col += c.slice(i,i+1);
      i++;
    }
    row = parseInt(c.slice(i));
    return {"col":col,"row":row-1};
  },

  /*
  * Converts a JSON from Google Spreadsheet Data API into a 2x2 Array
  *
  * @param {Object} results
  * @return {Array} [pos] = {value, type}
  */
  get : function(results){
    var matrix = [],cr,col,max_col=0;
    
    for(var i=0,z=results.feed.entry.length;i<z;i++){
      cr = this.getColRow(results.feed.entry[i].title.$t);
      col = this.getColNumber(cr.col);
      if(!matrix[cr.row]){
        matrix[cr.row]=[];
      }
      matrix[cr.row][col]={
        "value" : results.feed.entry[i].content.$t,
        "type" :  results.feed.entry[i].content.type
      }
      if(max_col<=col){
        max_col=col;
      }else{
        if(matrix[cr.row][max_col]==undefined){
          matrix[cr.row][max_col]=null;
        }
      }
    }

    for(var i=0,z=matrix.length;i<z;i++){
      if(matrix[i] && matrix[i][max_col]==undefined){
        matrix[i][max_col]=null;
      }else{
        if(!matrix[i]){
          matrix[i]=[];
          matrix[i][max_col]=null;
        }
      }
    }    
    return matrix;
  }  
}