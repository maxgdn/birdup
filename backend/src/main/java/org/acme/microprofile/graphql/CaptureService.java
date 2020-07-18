package org.acme.microprofile.graphql;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@RegisterRestClient
public interface CaptureService {

    @POST
    @Path("/capture")
    @Produces("application/json")
    Capture capture(String id);
}