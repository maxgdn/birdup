package org.acme.microprofile.graphql;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class BirdingService {

    @Inject
    EntityManager entityManager;

    public List<Sighting> getAllSighting() {
        return entityManager.createNamedQuery("Sightings.findAll", Sighting.class)
                .getResultList();
    }

    public Sighting getSighting(String id) throws Exception {
        Sighting entity = entityManager.find(Sighting.class, id);
        if(entity == null) {
            throw new Exception("Sighting with id of " + id + "doesn't not exist.");
        }
        return entity;
    }

    @Transactional
    public Sighting createSighting(String id){
        Sighting entity = new Sighting();
        entity.setId(id);
        entity.setCapturedDate(new Date());
        entityManager.persist(entity);
        return entity;
    }

    @Transactional
    public Sighting addBird(String sightingId,String birdId) throws Exception {
        Sighting sightingEntity = entityManager.find(Sighting.class, sightingId);
        Bird birdEntity = entityManager.find(Bird.class, birdId);
        if(sightingEntity == null) {
            throw new Exception("Sighting with id of " + sightingId + "doesn't not exist.");
        }

        if(birdEntity == null) {
            throw new Exception("Bird with id of " + birdId + "doesn't not exist.");
        }

        sightingEntity.addBird(birdEntity);
        

        return sightingEntity;
    }

    @Transactional
    public Sighting removeBird(String sightingId,String birdId) throws Exception {
        Sighting sightingEntity = entityManager.find(Sighting.class, sightingId);
        Bird birdEntity = entityManager.find(Bird.class, birdId);
        if(sightingEntity == null) {
            throw new Exception("Sighting with id of " + sightingId + "doesn't not exist.");
        }

        if(birdEntity == null) {
            throw new Exception("Bird with id of " + birdId + "doesn't not exist.");
        }

        sightingEntity.removeBird(birdEntity);
        

        return sightingEntity;
    }

    //## Bird

    public List<Bird> getAllBirds() {
        return entityManager.createQuery("SELECT b FROM Bird b", Bird.class)
                .getResultList();
    }
    
    public Bird getBird(String id) throws Exception {
        Bird entity = entityManager.find(Bird.class, id);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }
        return entity;
    }

    public Set<Sighting> getSightingsByBird(String id) throws Exception {
        Bird entity = entityManager.find(Bird.class, id);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }

        return entity.getSightings();
    }

    @Transactional
    public Bird createBird(Bird bird) throws Exception {
        UUID uuid = UUID.randomUUID();
        bird.setId(uuid);

        if(bird.getGenusName() == null) throw new Exception("Bird genusName is empty.");
        if(bird.getName() == null) throw new Exception("Bird name is empty.");

        entityManager.persist(bird);
        return bird;
    }

    @Transactional
    public String deleteBird(String id) throws Exception {
        Bird entity = entityManager.find(Bird.class, id);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }

        entityManager.remove(entity);
        return "Deleted Bird";
    }
}