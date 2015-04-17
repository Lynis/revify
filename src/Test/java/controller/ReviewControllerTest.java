package controller;

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
        System.out.println();
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?categoryID=1&range=latest");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String latestReviews = response.getEntity(String.class);
        System.out.println(latestReviews);
    }

    @Test
    public void testGetAggregatedReviews() throws Exception {
        System.out.println("Testing getAggregatedReviews.. ");
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?categoryID=1&range=aggregated");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String aggReviews = response.getEntity(String.class);
        JSONArray jsonArray = new JSONArray(aggReviews);
        JSONObject jsonObjectProduct = jsonArray.getJSONObject(0);
        JSONObject jsonObjectName = jsonObjectProduct.getJSONObject("productDTO");
        Assert.assertEquals(jsonObjectName.getString("productName"), "Olympus 24x Zoom Camera");
    }

    @Test
    public void testGetIndividualReview() throws Exception {
        System.out.println("Testing getIndividualReviews.. ");
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?productID=1&range=individual");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String individualReview = response.getEntity(String.class);
        JSONArray jsonArrayIndiReviews = new JSONArray(individualReview);
        JSONObject jsonObjectProduct = jsonArrayIndiReviews.getJSONObject(0);
        JSONObject jsonObjectName = jsonObjectProduct.getJSONObject("productDTO");
        String productReviewDTOs = jsonObjectName.getString("productReviewDTOs");
        JSONArray jsonArrayProductReviews = new JSONArray(productReviewDTOs);
        Assert.assertEquals(jsonArrayProductReviews.length(),2);
        Assert.assertEquals(jsonObjectName.getString("productName"), "Olympus 24x Zoom Camera");
    }

    @Test
    public void testGetSortedReviews() throws Exception{
        System.out.println("Testing getGetSortedReviews .. ");
        WebResource webResource = client.resource("http://localhost:8080/revify/services/reviews?categoryID=1&featureName=Lens");
        ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
        Assert.assertEquals(response.getStatus(), 200);
        String sortedReviews = response.getEntity(String.class);
        JSONArray jsonArraySortedReviews = new JSONArray(sortedReviews);
        JSONObject jsonObjectProduct = jsonArraySortedReviews.getJSONObject(0);
        JSONObject jsonObjectName = jsonObjectProduct.getJSONObject("productDTO");
        String jsonFeatures = jsonObjectName.getString("features");
        JSONArray jsonArraySortedReview = new JSONArray(jsonFeatures);
        Assert.assertEquals(jsonArraySortedReview.length(), 1);
        Assert.assertEquals(jsonObjectName.getString("productName"), "Olympus 24x Zoom Camera");
    }

    @After
    public void testOver() {
        System.out.println("All tests are done!!");
    }
}