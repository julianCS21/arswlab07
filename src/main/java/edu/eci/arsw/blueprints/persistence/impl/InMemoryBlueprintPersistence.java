/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence {

    private final Map<Tuple<String, String>, Blueprint> blueprints = new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts = new Point[]{new Point(140, 140), new Point(115, 115)};
        Blueprint bp = new Blueprint("julian",  "plano-1", pts);
        Blueprint bp2 = new Blueprint("julian",  "plano-2", pts);
        Blueprint bp3 = new Blueprint("camilo",  "plano-3", pts);
        blueprints.put(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        blueprints.put(new Tuple<>(bp2.getAuthor(), bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(), bp3.getName()), bp3);
    }

    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(), bp.getName()))) {
            throw new BlueprintPersistenceException("The given blueprint already exists: " + bp);
        } else {
            blueprints.put(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        Set<Tuple<String,String>> keys = blueprints.keySet();
        Set<Blueprint> AuthorBluePrints = new HashSet<Blueprint>();
        for(Tuple<String,String> bp : keys){
            if(blueprints.get(bp).getAuthor().equals(author)){
                AuthorBluePrints.add(blueprints.get(bp));
            }
        }
        return AuthorBluePrints;
    }


    public Set<Blueprint> getAllBlueprints() {
        Set<Blueprint> result = new HashSet<>();
        Set<Tuple<String, String>> keys = blueprints.keySet();
        for (Tuple<String, String> bp : keys) {
            result.add(blueprints.get(bp));
        }
        return result;
    }


    @Override
    public  Set<Blueprint> getBlueprintsByAuthorAndName(String Author, String Name) throws BlueprintNotFoundException {
        Set<Blueprint> result = new HashSet<>();
        Set<Blueprint> filterByAuthor = getBlueprintsByAuthor(Author);
        for(Blueprint bp : filterByAuthor){
            if(bp.getName().equals(Name)){
                result.add(bp);
            }
        }
        return result;
    }

    @Override
    public void updateBlueprint(Blueprint bp,String authorOldBp,String nameOldBp) throws BlueprintNotFoundException {
        Tuple<String, String> tp = new Tuple<>(authorOldBp,nameOldBp);
        try {
            Blueprint bpset = blueprints.get(tp);
            bpset.setAuthor(bp.getAuthor());
            bpset.setName(bp.getName());
        }catch (NullPointerException e){
            throw new BlueprintNotFoundException(e.getMessage());
        }



    }


}
