const url = 'http://localhost:8080/blueprints/';



export const apiclient = (function(){

  
    return{
        getBlueprintsByAuthor : function(author,callback){
                $.get(url + author,function(data){
                callback(data);
                });
        },


        getBlueprintsByNameAndAuthor: function(author,name,callback){
                $.get(url + author + "/" + name,function(data){
                    callback(data[0]);  
                });  
        }

    }
})();