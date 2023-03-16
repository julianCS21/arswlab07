const url = 'http://localhost:8080/blueprints/';



export const apiclient = (function(){

    var dataCallback = [];

    return{


        getBlueprintsByAuthor : function(author,callback){
            $.get(url + author,function(data){
                dataCallback = data;
            });
            return dataCallback;
        },



        getBlueprintsByNameAndAuthor: function(author,name,callback){
            $.get(url + author + "/" + name,function(data){
                return data;
            },"json");
        }

    }
})();