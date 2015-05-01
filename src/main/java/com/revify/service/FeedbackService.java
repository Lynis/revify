package com.revify.service;


import com.revify.dto.FeedbackDTO;


import java.util.List;

/**
 * Created by MohulT430 on 4/4/2015.
 */
public interface FeedbackService {

    public List<FeedbackDTO> getNumberOfReviews(String userID);


}
