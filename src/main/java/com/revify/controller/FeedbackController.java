package com.revify.controller;

import com.revify.dto.FeedbackDTO;
import com.revify.dto.FeedbackProductDTO;
import com.revify.dto.ProductReviewDTO;
import com.revify.entity.ProductReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revify.service.FeedbackService;

import java.util.List;

/**
 * Created by MohulT430 on 4/4/2015.
 */

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackservice;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    //public List<ProductReview> getNumberOfReviews(@RequestParam(required = true, value = "userID") String userID, @RequestParam(required = true, value = "token") String token){
    public List<FeedbackDTO> getNumberOfReviews(@RequestParam(required = true, value = "userID") String userID){
        return feedbackservice.getNumberOfReviews(userID);
    }
}
