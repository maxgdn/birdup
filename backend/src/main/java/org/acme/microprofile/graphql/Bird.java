package org.acme.microprofile.graphql;

import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Cacheable;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany; 

import java.util.UUID;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "birds")
@Cacheable
public class Bird {

    @Id
    @Column
    private UUID id;

    @Column
    private String genusName;

    @Column
    private String name;

    @ManyToMany(mappedBy = "birds", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Set<Sighting> sightings = new HashSet<>();

    public String getId() {
        return id.toString();
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getGenusName() {
        return genusName;
    }

    public void setGenusName(String n) {
        this.genusName = n;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Sighting> getSightings() {
        return sightings;
    }

    
}