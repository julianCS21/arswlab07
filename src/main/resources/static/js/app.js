import {apimock} from './apimock.js';


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




function getBlueprintsByAuthor(){
    const author = $("#author").val();
    apimock.getBlueprintsByAuthor(author,function(list){
        const listBlueprints = list.map(function(elem){
            const newlist = [elem.name,elem.points];
            return new Blueprint(elem.author,newlist);
            
        })
        $(document).ready(function(){
            $(".add_row").click(function(){
                const column = listBlueprints.map(function(blueprint){

                    var columnPartial = "<tr><td align=\"center\" id=\""+blueprint.getName()+"\">"+plano.getName()+"</td><td align=\"center\">"+plano.getPoints()+"</td></tr>";
                    $("table tbody").append(columnPartial);
                    return columnPartial;
                })

            })
        })


        const points = listBlueprints.map(function(elem){
            return elem.getPoints();
        })
        var pointsNumber = points.reduce(getSum(),0);
        var newText = "Total user points : " + pointsNumber; 
        $("#totalBlueprints").text(newText);
    })
}



