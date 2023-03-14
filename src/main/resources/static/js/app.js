import {apimock} from './apimock.js';

//simulacion del objeto en base a funcion.
function Blueprint(author,blueprints){
    let _author = author;
    let _blueprints = blueprints;


    this.setAuthor = function(newAuthor){
        _author = newAuthor;

    }

    this.getName = function(){
        return _blueprints[0];
    }

    this.getPoints = function(){
        return _blueprints[1];
    }
}

function getSum(total,sum){
    return total + sum;
}

//llamado al callback de apimock
function getBlueprintsByAuthor(){
    var author = $("#author").val().split(" ").join("");
    apimock.getBlueprintsByAuthor(author,function(list){
        const listBlueprints = list.map(function(elem){
            const newlist = [elem.name,elem.points];
            return new Blueprint(elem.author,newlist);
            
        })
        const column = listBlueprints.map(function(blueprint){
            console.log(blueprint.getPoints())
            var columnPartial = "<tr><td align=\"center\" id=\""+blueprint.getName()+"\">"+blueprint.getName()+"</td><td align=\"center\">"+blueprint.getPoints().length+"</td></tr>";
            $("table tbody").append(columnPartial);
            return columnPartial;


        })
        const points = listBlueprints.map(function(elem){
            return elem.getPoints();
        })
        console.log(points);
        var pointsNumber = points.reduce(getSum(),0);
        var newText = "Total user points : " + pointsNumber; 
        $("#totalBlueprints").text(newText);
    })
}


//eventos

$(document).ready(function() {
    $(".add_row").click(function() {
      getBlueprintsByAuthor();
    });
  });




