package com.revify.dto;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kalyaninirmal on 3/26/2015.
 */
public class ReviewDTO {

    private ProductDTO productDTO;

    public ProductDTO getProductDTO() {
        return productDTO;
    }

    public void setProductDTO(ProductDTO productDTO) {
        this.productDTO = productDTO;
    }
}
