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
    public CartItem addItemToCart(@RequestBody Map<String, Integer> request) {
        int userId = request.get("userId");
        int productId = request.get("productId");
        int quantity = request.get("quantity");
        Cart cart = cartService.getOrCreateCart(userId);
        return cartService.addItemToCart(cart.getId(), productId, quantity);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable int userId) {
        return cartService.getOrCreateCart(userId);
    }

    @GetMapping("/{cartId}/items")
    public List<CartItem> getCartItems(@PathVariable int cartId) {
        return cartService.getCartItems(cartId);
    }
}
