package com.revify.service;

import com.revify.dto.PlayerDTO;
import com.revify.dto.ProductDTO;
import com.revify.dto.ProductReviewDTO;

import java.util.List;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */
public interface GameService {

    public List<ProductDTO> getProductsPurchasedByEbayUser(String userID, String token);

    public void saveProductFeatureRating(ProductReviewDTO productReviewDTO);

    public List<PlayerDTO> getLeaderboard();
}
