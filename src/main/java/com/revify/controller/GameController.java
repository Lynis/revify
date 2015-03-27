package com.revify.controller;

import com.revify.dto.ProductDTO;
import com.revify.dto.ProductReviewDTO;
import com.revify.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by jchengottusseriy on 3/18/2015.
 */

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @RequestMapping(produces = "application/json", value = "/products/{userID}", method = RequestMethod.GET)
    public List<ProductDTO> getProductsPurchasedFromEBayByUser(@PathVariable String userID, @RequestParam(value="token") String token){
        return gameService.getProductsPurchasedByEbayUser(userID, token);
    }

    @RequestMapping(consumes = "application/json", produces = "application/json", value = "/review", method = RequestMethod.POST)
    public void saveReview(@RequestBody ProductReviewDTO productReviewDTO){
        gameService.saveProductFeatureRating(productReviewDTO);
    }
}
