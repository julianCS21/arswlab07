package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.filter;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class redundancyFilter implements filter {


    private boolean contains(Point p, List<Point> points){
        for(Point point : points){
            if(p.getX() == point.getX() && p.getY() == point.getY()){
                return true;
            }
        }
        return false;
    }

    private List<Point> eliminateDuplicate(List<Point> points){
        List<Point> pointsR = new ArrayList<>();
        for (Point point : points) {
            if (!contains(point,pointsR)) {
                pointsR.add(point);
            }
        }
        return pointsR;
    }


    @Override
    public void filter(Set<Blueprint> bp) {
        for(Blueprint bpp : bp){
            List<Point> newPoints = eliminateDuplicate(bpp.getPoints());
            bpp.setPoints(newPoints);
        }

    }
}
