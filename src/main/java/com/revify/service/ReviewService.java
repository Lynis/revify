package com.revify.service;

import com.revify.dto.LatestReviewDTO;
import com.revify.dto.ReviewDTO;

import java.util.List;

/**
 * Created by Vijaya on 3/23/2015.
 */
public interface ReviewService {

    public List<LatestReviewDTO> getLatestReviews(Long categoryID);
    public List<ReviewDTO> getAggregatedReviews(Long categoryID);
    public List<ReviewDTO> getIndividualReview(Long productID);
}
