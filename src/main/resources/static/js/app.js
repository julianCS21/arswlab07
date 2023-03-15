import {apimock} from './apimock.js';

//simulacion del objeto en base a funcion.
function Blueprint(author,blueprints){
    let _author = author;
    let _blueprints = blueprints;

    this.setAuthor = function(newAuthor){
        _author = newAuthor;

    }

    this.getAuthor = function(){
        return _author;
    }

    this.getName = function(){
        return _blueprints[0];
    }

    this.getPoints = function(){
        return _blueprints[1];
    }
}



//llamado al callback de apimock

window.app = function(){

    function getBlueprints(){
        $("#desc").text("Blueprints of : " + $("#author").val());
        var author = $("#author").val().split(" ").join("");
        apimock.getBlueprintsByAuthor(author,function(list){
            const listBlueprints = list.map(function(elem){
                const newlist = [elem.name,elem.points];
                return new Blueprint(elem.author,newlist);
                
            });
            $("table tbody").empty();
            const column = listBlueprints.map(function(blueprint){
                var columnPartial = "<tr><td align=\"center\" id=\""+blueprint.getName()+"\">"+blueprint.getName()+"</td><td align=\"center\">"+blueprint.getPoints().length+"</td><td><button onclick=\"app.drawBlueprints('"+blueprint.getAuthor() + "','" + blueprint.getName() + "')\">Open</button></td></tr>";
                $("table tbody").append(columnPartial);
                return columnPartial;
            });
            const points = listBlueprints.map(function(elem){
                return elem.getPoints().length;
            })
            var initialValue = 0;
            var total = points.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue
            );
            $("#totalBlueprints").text("Total user points : " + total);
            
        })}


    function drawBlueprints(author,name){
        console.log("a");
        

    } 
    return{
            getBlueprints : getBlueprints,
            drawBlueprints : drawBlueprints
    }

}();

app;


    













