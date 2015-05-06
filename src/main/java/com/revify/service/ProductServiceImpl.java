package com.revify.service;

import com.ebay.sdk.ApiContext;
import com.ebay.sdk.call.GetItemCall;
import com.ebay.sdk.call.GetOrdersCall;
import com.ebay.soap.eBLBaseComponents.*;
import com.revify.entity.Category;
import com.revify.entity.PurchasedProduct;
import com.revify.entity.PurchasedProductUser;
import com.revify.entity.User;
import com.revify.hystrix.GetItemCommand;
import com.revify.hystrix.GetOrdersCommand;
import com.revify.repository.CategoryRepository;
import com.revify.repository.PurchasedProductRepository;
import com.revify.repository.PurchasedProductUserRepository;
import com.revify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Vijaya on 4/3/2015.
 */
@Service
public class ProductServiceImpl implements ProductService {

    public static final int ORDER_NUMBER_OF_DAYS = 30;
    public static final int ORDER_ENTRIES_PER_PAGE = 30;
    public static final int ORDER_PAGE_NUMBER = 1;
    public static final String COLON = ":";
    public static final int ZERO = 0;

    @Autowired
    PurchasedProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PurchasedProductUserRepository productUserRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public void extractAndSaveProductInfo(ApiContext apiContext) {

        List<ItemType> itemList = new ArrayList<ItemType>();
        User user;
        OrderType[] orders = getOrders(apiContext);

        if(orders!=null) {
            String userId = orders[0].getBuyerUserID();
            System.out.println("User id:" + userId);
            // check if user exists
            if(!userRepository.exists(userId)) {
                user = new User();
                user.setUserID(userId);
                userRepository.save(user);
                entityManager.flush();
                //saveUser(user);
            }else{
                user = userRepository.findOne(userId);
            }
        }
        else{
            return;
        }

        for(OrderType order: orders){

            TransactionArrayType transactionArray = order.getTransactionArray();
            TransactionType[] transactions = transactionArray.getTransaction();

            for(TransactionType transaction: transactions){
                String itemID = transaction.getItem().getItemID();
                ItemType item = getItem(itemID, apiContext);

                ProductListingDetailsType productListingDetails =  item.getProductListingDetails();

                if(productListingDetails != null) {

                    PurchasedProduct purchasedProduct;

                    // Check if the product already exists in the repository
                    String productID = productListingDetails.getUPC();
                    if(productID == null){
                        return;
                    }
                    System.out.println("UPC:" + productID);
                    if(!productRepository.exists(productID)){
                        // create a new product and save
                        purchasedProduct = new PurchasedProduct();
                        String productTitle = item.getTitle();

                        String categoryName = item.getPrimaryCategory().getCategoryName();
                        if(categoryName.contains(COLON)){
                            categoryName = categoryName.substring(categoryName.lastIndexOf(COLON) + 1, categoryName.length());
                        }

                        Category category = categoryRepository.findByCategoryName(categoryName.trim());
                        if(category == null){
                            System.out.println(categoryName + " is not supported!");
                            continue;
                        }

                        double startPrice = item.getStartPrice().getValue();

                        String stockPhotoURL = productListingDetails.getStockPhotoURL();

                        System.out.println("Product title:" + productTitle);
                        System.out.println("Category name:" + categoryName);
                        System.out.println("Start Price:" + startPrice);
                        System.out.println("ProductID:" + productListingDetails.getProductID());
                        System.out.println("stockPhotoURL:" + stockPhotoURL );

                        purchasedProduct.setProductID(productID);

                        purchasedProduct.setCategory(category);
                        purchasedProduct.setImage(stockPhotoURL);
                        purchasedProduct.setPrice(startPrice);
                        purchasedProduct.setProductName(productTitle);

                        //save purchased product
                        productRepository.save(purchasedProduct);
                        entityManager.flush();
                        //saveProduct(purchasedProduct);
                    }else{
                        purchasedProduct = productRepository.findOne(productID);
                    }

                    // Check if there is entry of this purchase
                    List<User> userList = productUserRepository.findByProduct(purchasedProduct);
                    if(userList!=null && !userList.contains(user)) {
                        PurchasedProductUser productUser = new PurchasedProductUser();
                        productUser.setUser(user);
                        productUser.setProduct(purchasedProduct);
                        productUser.setUserID(user.getUserID());
                        productUser.setProductID(purchasedProduct.getProductID());
                        productUserRepository.saveAndFlush(productUser);

                    }
                }
            }
        }


    }

    private OrderType[] getOrders(ApiContext apiContext){
        // Make api call to GetOrders
        GetOrdersCall orderApi = new GetOrdersCall(apiContext);

        orderApi.setNumberOfDays(ORDER_NUMBER_OF_DAYS);
        DetailLevelCodeType[] detailLevels = new DetailLevelCodeType[]{
                DetailLevelCodeType.RETURN_ALL,
                DetailLevelCodeType.ITEM_RETURN_ATTRIBUTES,
                DetailLevelCodeType.ITEM_RETURN_CATEGORIES,
                DetailLevelCodeType.ITEM_RETURN_DESCRIPTION
        };

        orderApi.setDetailLevel(detailLevels);
        orderApi.setOrderRole(TradingRoleCodeType.BUYER);
        orderApi.setOrderStatus(OrderStatusCodeType.COMPLETED);

        PaginationType paginationType = new PaginationType();
        paginationType.setEntriesPerPage(ORDER_ENTRIES_PER_PAGE);
        paginationType.setPageNumber(ORDER_PAGE_NUMBER);
        orderApi.setPagination(paginationType);

        OrderType[] orders = null;

        try {
            //orders = orderApi.getOrders();
            orders = new GetOrdersCommand(orderApi).execute();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return orders;
    }

    private ItemType getItem(String itemID, ApiContext apiContext){
        GetItemCall itemApi = new GetItemCall(apiContext);
        DetailLevelCodeType[] detailLevels = new DetailLevelCodeType[]{
          DetailLevelCodeType.RETURN_ALL,
          DetailLevelCodeType.ITEM_RETURN_ATTRIBUTES
        };

        itemApi.setDetailLevel(detailLevels);
        ItemType item = null;
        try {
            //item = itemApi.getItem(itemID);
            item = new GetItemCommand(itemApi, itemID).execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return item;
    }

}
