package org.acme.microprofile.graphql;

import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Query;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Name;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.DefaultValue;
import org.eclipse.microprofile.graphql.Source;
import org.eclipse.microprofile.graphql.Source;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.json.Json;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@GraphQLApi
public class BirdUpResource {

    @Inject
    BirdingService service;

    @Inject
    @RestClient
    CaptureService captureService;

    @Query("allSightings")
    @Description("Get all Sightings that have been captured")
    public List<Sighting> getAllSightings() {
        return service.getAllSighting();
    }

    @Query("getSighting")
    @Description("Get a Sighting from storage")
    public Sighting getSighting(@Name("sightingId") String id) throws Exception {
        return service.getSighting(id);
    }

    @Mutation("capture")
    @Description("Captures an Image and creates a new Sighting")
    public Sighting capture() throws Exception {
        
        String id = UUID.randomUUID().toString();
        JsonObject jObject = Json.createObjectBuilder().add("id", id).build();
        JsonObject ret = captureService.capture(jObject);
        
        if(id.isEmpty()) {
            throw new Exception("Failed to capture image");
        }
        return service.createSighting(ret.getString("id"));
    }

    @Mutation("addBird")
    @Description("Adds a Bird to Sighting")
    public Sighting addBird(@Name("sightingId") String sightingId, @Name("birdId") String birdId) throws Exception {
        return service.addBird(sightingId, birdId);
    }

    @Mutation("removeBird")
    @Description("Removes a Bird from a Sighting")
    public Sighting removeBird(@Name("sightingId") String sightingId, @Name("birdId") String birdId) throws Exception {
        return service.removeBird(sightingId, birdId);
    }

    @Query("allBirds")
    @Description("Get all Birds")
    public List<Bird> getAllBirds() {
        return service.getAllBirds();
    }

    @Query("getBird")
    @Description("Get a Bird from storage")
    public Bird getBird(@Name("birdId") String id) throws Exception {
        return service.getBird(id);
    }

    @Query("getSightingsByBird")
    @Description("Get all sightings of a specific bird")
    public List<Sighting> getSightingsByBird(@Name("birdId") String id) throws Exception {
        return service.getSightingsByBird(id);
    }

    @Mutation("createBird")
    @Description("Creates a Bird")
    public Bird createBird(@Name("genusName") String genusName, @Name("name") Stirng name) throws Exception {
        return service.createBird(genusName, name);
    }

    @Mutation("deleteBird")
    @Description("Deletes a Bird")
    public Bird deleteBird(@Name("id") String id) throws Exception {
        return service.deleteBird(id);
    }
}