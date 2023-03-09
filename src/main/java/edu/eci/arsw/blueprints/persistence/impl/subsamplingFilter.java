package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.filter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class subsamplingFilter implements filter {

    private List<Point> eliminateInterspersed(List<Point> points){
        List<Point> pointsR = new ArrayList<>();
        boolean key = true;
        for(int i = 1; i < points.size(); i += 2){
            try{
                if(key){
                    pointsR.add(points.get(i-1));
                    key = false;
                }
                else{
                    pointsR.add(points.get(i));
                    key = true;
                }
            }catch (IndexOutOfBoundsException e ){
                break;
            }
        }
        return pointsR;
    }


    @Override
    public void filter(Set<Blueprint> bp) {
        for(Blueprint bpp : bp){
            List<Point> newPoints = eliminateInterspersed(bpp.getPoints());
            bpp.setPoints(newPoints);
        }

    }

}
