package com.revify.repository;

import com.revify.entity.PurchasedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;
/**
 * Created by Vijaya on 3/23/2015.
 */
public interface PurchasedProductRepository extends JpaRepository<PurchasedProduct, String> {

}
