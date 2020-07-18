package org.acme.microprofile.graphql;

import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.NamedQuery;
import javax.persistence.QueryHint;
import javax.persistence.Cacheable;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import java.util.UUID;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "sightings")
@NamedQuery(name = "Sightings.findAll", query = "SELECT s FROM Sighting s", hints = @QueryHint(name = "org.hibernate.cacheable", value = "true"))
@Cacheable
public class Sighting {

    @Id
    @Column
    private String id;

    @Column
    private Date capturedDate;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "Bird_Sightings",
            joinColumns = {@JoinColumn(name = "sighting_id")},
            inverseJoinColumns = {@JoinColumn(name = "bird_id")}
    )
    private Set<Bird> birds = new HashSet<>();

    public String getId() {
        return id.toString();
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCapturedDate() {
        return capturedDate;
    }

    public void setCapturedDate(Date d) {
        this.capturedDate = d;
    }

    public Set<Bird> getBirds() {
        return birds;
    }

    public void addBird(Bird bird) {
        birds.add(bird);
        bird.getSightings().add(this);
    }

    public void removeBird(Bird bird) {
        birds.remove(bird);
        bird.getSightings().remove(this);
        
    }
}