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
        UUID uuid = UUID.fromString(id);
        Sighting entity = entityManager.find(Sighting.class, uuid);
        if(entity == null) {
            throw new Exception("Sighting with id of " + id + "doesn't not exist.");
        }
        return entity;
    }

    @Transactional
    public Sighting createSighting(String id){
        UUID uuid = UUID.fromString(id);
        Sighting entity = new Sighting();
        entity.setId(uuid);
        entity.setCapturedDate(new Date());
        entityManager.persist(entity);
        return entity;
    }

    @Transactional
    public Sighting addBird(String sightingId,String birdId) throws Exception {
        System.out.println("Sight");
        System.out.println(sightingId);
        System.out.println("Bird");
        System.out.println(birdId);
        UUID suuid = UUID.fromString(sightingId);
        UUID buuid = UUID.fromString(birdId);
        Sighting sightingEntity = entityManager.find(Sighting.class, suuid);
        Bird birdEntity = entityManager.find(Bird.class, buuid);
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
        UUID suuid = UUID.fromString(sightingId);
        UUID buuid = UUID.fromString(birdId);
        Sighting sightingEntity = entityManager.find(Sighting.class, suuid);
        Bird birdEntity = entityManager.find(Bird.class, buuid);
        if(sightingEntity == null) {
            throw new Exception("Sighting with id of " + sightingId + "doesn't not exist.");
        }

        if(birdEntity == null) {
            throw new Exception("Bird with id of " + birdId + "doesn't not exist.");
        }

        sightingEntity.removeBird(birdEntity);
        

        return sightingEntity;
    }

    public List<Bird> getAllBirds() {
        return entityManager.createNamedQuery("Birds.findAll", Bird.class)
        .getResultList();
    }
    
    public Bird getBird(String id) throws Exception {
        UUID uuid = UUID.fromString(id);
        Bird entity = entityManager.find(Bird.class, uuid);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }
        return entity;
    }

    public List<Sighting> getSightingsByBird(String id) throws Exception {
        UUID uuid = UUID.fromString(id);
        Bird entity = entityManager.find(Bird.class, uuid);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }
        return new ArrayList<>(entity.getSightings());
    }

    @Transactional
    public Bird createBird(String genusName, String name) throws Exception {
        UUID uuid = UUID.randomUUID();
        Bird bird = new Bird();
        bird.setId(uuid);
        bird.setGenusName(genusName);
        bird.setName(name);

        if(bird.getGenusName() == null) throw new Exception("Bird genusName is empty.");
        if(bird.getName() == null) throw new Exception("Bird name is empty.");

        entityManager.persist(bird);
        return bird;
    }

    @Transactional
    public Bird deleteBird(String id) throws Exception {
        UUID uuid = UUID.fromString(id);
        Bird entity = entityManager.find(Bird.class, uuid);
        if(entity == null) {
            throw new Exception("Bird with id of " + id + "doesn't not exist.");
        }

        for(Sighting sighting : entity.getSightings()) {
            sighting.removeBird(entity);
        }

        entityManager.remove(entity);
        return entity;
    }
}