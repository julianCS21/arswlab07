import {apimock} from './apimock.js';
import {apiclient} from './apiclient.js';

//simulacion del objeto en base a funcion.
var getData = apimock;
//var getData = apiclient;

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
        getData.getBlueprintsByAuthor(author,function(list){
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
        $("#nameBlueprint").text("Current Blueprint:" + " "  + name);
        getData.getBlueprintsByNameAndAuthor(author,name,function(object){
            const points = object.points;
            console.log(points);
            var canvas = $("#Canvas");
            canvas = $("#Canvas")[0];
            var ctx = canvas.getContext("2d");
            ctx.moveTo(points[0]["x"],points[0]["y"]);
            for(let i=1;i<points.length; i++){
                ctx.lineTo(points[i]["x"],points[i]["y"]);
            }
            ctx.stroke();
        })  
    }

    function Oninit(){
        var canvas = $("#Canvas");
        var ctx = canvas.getContext("2d");
        canvas = $("#Canvas")[0];
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event){
                const newPoints = {
                    "x": event.clientX,
                    "y" : event.clientY
                }
                var author = ( $("#author").val()).split(" ").join("");
                var name = ($("#nameBlueprint").text().split(" ")[2]);
                getData.saveBlueprint(author,name,function(list){
                    var lastpoint = list.points[list.points.length - 1];
                    list.points.push(newPoints);
                    getBlueprints();
                    


                    
                })
              })
          }
          else {
            canvas.addEventListener("mousedown", function(event){
                        alert('mousedown at '+event.clientX+','+event.clientY);  
    
              }
            );
          }
        };    
      

    
    
    



    return{
            getBlueprints : getBlueprints,
            drawBlueprints : drawBlueprints,
            Oninit : Oninit
    }

}();

app;


    













