package com.revify.controller;

import com.revify.dto.FeatureDTO;
import com.revify.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
@RestController
@RequestMapping("/features")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public List<FeatureDTO> getCategories(@RequestParam(required = true, value = "categoryID") Long categoryID) {
        return featureService.getFeatures(categoryID);
    }
}
