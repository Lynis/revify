package com.revify.controller;

import com.revify.dto.ReviewDTO;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;

import java.lang.System;

public class ReviewControllerTest {

    Client client = null;

    @Before
    public void setUpClient(){
        client = Client.create();
    }

   // @Test
    public void testGetLatestReviews() throws Exception {
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?categoryID=1&range=latest");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String latestReviews = response.getEntity(String.class);
        System.out.println(latestReviews);
    }

    @Test
    public void testGetAggregatedReviews() throws Exception {
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?categoryID=1&range=aggregated");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String aggReviews = response.getEntity(String.class);
        JSONObject jsonObject = new JSONObject(aggReviews);
        System.out.println(jsonObject);
        //JSONArray jsonArray = jsonObject.getJSONArray();
        System.out.println(aggReviews);
    }

    //@Test
    public void testGetIndividualReview() throws Exception {
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?productID=1&range=individual");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String individualReview = response.getEntity(String.class);
        System.out.println(individualReview);
    }

    //@Test
    public void testGetSortedReviews() throws Exception{
        WebResource webResource = client.resource("http://localhost:8080//revify/services/reviews?categoryID=1&featureName=Lens");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String sortedReviews = response.getEntity(String.class);
        System.out.println(sortedReviews);
    }

    @After
    public void testOver() {
        System.out.println("All tests are done!!");
    }
}