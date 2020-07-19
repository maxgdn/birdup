package org.acme.microprofile.graphql;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import javax.json.JsonValue;
import javax.json.JsonObject;

@RegisterRestClient
public interface CaptureService {

    @POST
    @Path("/capture")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    JsonObject capture(JsonValue val);
}