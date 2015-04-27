package com.revify.repository;

import com.revify.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by jchengottusseriy on 4/21/2015.
 */
public interface FeatureRepository extends JpaRepository<Feature, Long> {
}
