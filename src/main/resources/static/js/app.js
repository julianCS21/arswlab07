import { apimock } from './apimock.js';
import { apiclient } from './apiclient.js';

//simulacion del objeto en base a funcion.
//var getData = apimock;
var getData = apiclient;

function Blueprint(author, blueprints) {
    let _author = author;
    let _blueprints = blueprints;

    this.setAuthor = function (newAuthor) {
        _author = newAuthor;

    }

    this.getAuthor = function () {
        return _author;
    }

    this.getName = function () {
        return _blueprints[0];
    }

    this.getPoints = function () {
        return _blueprints[1];
    }
}


var blueprints = [];
var newPointsforAPI = [];
var ultimatePoint = {};
//llamado al callback de apimock

window.app = function () {

    function getBlueprints() {
        $("#desc").text("Blueprints of : " + $("#author").val());
        var author = $("#author").val().split(" ").join("");
        getData.getBlueprintsByAuthor(author, function (list) {
            const listBlueprints = list.map(function (elem) {
                const newlist = [elem.name, elem.points];
                return new Blueprint(elem.author, newlist);

            });
            blueprints = listBlueprints;
            $("table tbody").empty();
            const column = listBlueprints.map(function (blueprint) {
                var columnPartial = "<tr><td align=\"center\" id=\"" + blueprint.getName() + "\">" + blueprint.getName() + "</td><td align=\"center\">" + blueprint.getPoints().length + "</td><td><button onclick=\"app.drawBlueprints('" + blueprint.getAuthor() + "','" + blueprint.getName() + "')\">Open</button></td></tr>";
                $("table tbody").append(columnPartial);
                return columnPartial;
            });
            const points = listBlueprints.map(function (elem) {
                return elem.getPoints().length;
            })
            var initialValue = 0;
            var total = points.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue
            );
            $("#totalBlueprints").text("Total user points : " + total);

        })
    }


    function drawBlueprints(author, name) {
        $("#nameBlueprint").text("Current Blueprint:" + " " + name);
        getData.getBlueprintsByNameAndAuthor(author, name, function (object) {
            const points = object.points;
            console.log(points);
            var canvas = $("#Canvas");
            canvas = $("#Canvas")[0];
            var ctx = canvas.getContext("2d");
            canvas.width = canvas.width;
            ctx.moveTo(points[0]["x"], points[0]["y"]);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i]["x"], points[i]["y"]);
            }
            ctx.stroke();
        })
    }







    function Oninit() {
        var canvas = $("#Canvas");
        canvas = $("#Canvas")[0];
        let rect = canvas.getBoundingClientRect();
        var ctx = canvas.getContext("2d");
        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", function (event) {
                const newPoints = {
                    "x": event.clientX - rect.left,
                    "y": event.clientY - rect.top - 10
                }
                var author = ($("#author").val()).split(" ").join("");
                var name = ($("#nameBlueprint").text().split(" ")[2]);
                var blueprint = blueprints.find(function (bp) {
                    if (bp.getAuthor() === author && bp.getName() === name) {
                        return bp;
                    }
                })
                var points = blueprint.getPoints();
                //codigo que guarda los puntos en la memoria de pla aplicacion
                //getData.saveBlueprint(author, name, function (list) {
                    //list.points.push(newPoints);
                    //getBlueprints();
                    //drawBlueprints(author, name);
                //})
                newPointsforAPI.push(newPoints);
                if(newPointsforAPI.length == 1){
                    ultimatePoint = {
                        "x" : points[points.length - 1]["x"],
                        "y" : points[points.length - 1]["y"]
                    }                    
                }
                else{
                    ultimatePoint = {
                        "x" : newPointsforAPI[newPointsforAPI.length - 2]["x"],
                        "y" : newPointsforAPI[newPointsforAPI.length - 2]["y"]
                    }
                }
                ctx.moveTo(ultimatePoint["x"],ultimatePoint["y"]);
                ctx.lineTo(newPoints["x"],newPoints["y"]);
                ctx.stroke();
            })
        }
        else {
            canvas.addEventListener("mousedown", function (event) {
                alert('mousedown at ' + event.clientX + ',' + event.clientY);

            }
            );
        }
    };




    function updateBlueprint() {
        var author = ($("#author").val()).split(" ").join("");
        var name = ($("#nameBlueprint").text().split(" ")[2]);
        var blueprint = blueprints.find(function (bp) {
            if (bp.getAuthor() === author && bp.getName() === name) {
                return bp;
            }
        })
        var points = blueprint.getPoints();
        for (let i = 0; i < newPointsforAPI.length; i++) {
            points.push(newPointsforAPI[i]);

                     
        }
        var object = {
            "author": blueprint.getAuthor(),
            "points": blueprint.getPoints(),
            "name": blueprint.getName()
        }
        getData.saveBlueprint(author,name,JSON.stringify(object));
        getBlueprints();
        }








    return {
        getBlueprints: getBlueprints,
        drawBlueprints: drawBlueprints,
        Oninit: Oninit,
        updateBlueprint: updateBlueprint
    }

}();

app;
















