package com.example.controller;

import com.example.pojo.Cart;
import com.example.pojo.CartItem;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart createCart(@RequestParam int userId) {
        return cartService.createCart(userId);
    }

    @PostMapping("/add")
    public CartItem addItemToCart(@RequestBody Map<String, Object> request) {
        if (!request.containsKey("userId") || !request.containsKey("productId") || !request.containsKey("quantity")) {
            throw new IllegalArgumentException("Missing required parameters");
        }

        Integer userId = (Integer) request.get("userId");
        Integer productId = (Integer) request.get("productId");
        Integer quantity = (Integer) request.get("quantity");

        if (userId == null || productId == null || quantity == null) {
            throw new IllegalArgumentException("Invalid parameter values");
        }

        Cart cart = cartService.getOrCreateCart(userId);
        return cartService.addItemToCart(cart.getId(), productId, quantity);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable int userId) {
        return cartService.getOrCreateCart(userId);
    }

    @GetMapping("/user/{userId}/cart-id")
    public int getCartIdByUserId(@PathVariable int userId) {
        return cartService.getCartIdByUserId(userId);
    }

    @GetMapping("/{cartId}/items")
    public List<CartItem> getCartItems(@PathVariable int cartId) {
        return cartService.getCartItems(cartId);
    }
}
