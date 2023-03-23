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
        },


        saveBlueprint : function(author,name,object){
            let promise = new Promise(function(resolve,reject){
                $.ajax({
                    url: url  + author + "/" + name,
                    type: "PUT",
                    data: object,
                    contentType: "application/json"
                })
                resolve("The blueprint was saved")
            });

            promise.then(function(message){
                alert(message);
            }).catch(function(){
                alert("ERROR, the blueprint wasnt saved")
            })         
        },

        deleteBlueprint : function(author,name){
         $.ajax({
                url: url  + author + "/" + name,
                type: "DELETE",
                success: function(result){
                    alert("blueprint was deleted");
                },
                error: function(xhr, status, error){
                    alert("blueprint don´t found");
                }
        })

    }


}})();
