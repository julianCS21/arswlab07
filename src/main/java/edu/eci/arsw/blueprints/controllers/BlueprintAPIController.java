/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.awt.*;
import java.util.*;
import java.util.List;

import com.google.gson.Gson;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {


    @Autowired
    private BlueprintsServices bps;



    @GetMapping(produces =  MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprints() throws BlueprintNotFoundException {
        Set<Blueprint> result = bps.getAllBluePrints();
        return new ResponseEntity<>(new Gson().toJson(result), HttpStatus.OK);
    }


    @GetMapping(path = "/{author}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable String author){
        try{
            Set<Blueprint> result = bps.getBlueprintsByAuthor(author);
            return new ResponseEntity<>(new Gson().toJson(result),HttpStatus.OK);
        }
        catch (BlueprintNotFoundException e){
            return new ResponseEntity<>("no se encontro el plano de dicho autor",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/{author}/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprintByAuthorAndName(@PathVariable String author, @PathVariable String name){
        try {
            Set<Blueprint> result = bps.getBlueprintsByAuthorAndName(author,name);
            return new ResponseEntity<>(new Gson().toJson(result),HttpStatus.OK);
        } catch (BlueprintNotFoundException e) {
            return new ResponseEntity<>("no se encontro el plano con ese nombre",HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping
    public ResponseEntity<?> addBlueprint(@RequestBody  Blueprint newBp) throws BlueprintPersistenceException {
        try{
            bps.addNewBlueprint(newBp);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (BlueprintPersistenceException e){
            return new ResponseEntity<>("NO SE PUDO CREAR DICHO PLANO",HttpStatus.FORBIDDEN);

        }
    }


    @PutMapping(path = "/{author}/{bpname}")
    public ResponseEntity<?> updateBluePrint(@RequestBody Blueprint newBp, @PathVariable String author, @PathVariable String bpname){
        try{
            bps.updateBlueprint(newBp,author,bpname);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BlueprintNotFoundException e) {
            return new ResponseEntity<>("no se pudo actualizar el recurso",HttpStatus.BAD_REQUEST);
        }
    }
    
    
    
    
    
}

