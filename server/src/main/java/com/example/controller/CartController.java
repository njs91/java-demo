package com.example.controller;

import com.example.pojo.Cart;
import com.example.pojo.CartItem;
import com.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart createCart(@RequestParam int userId) {
        return cartService.createCart(userId);
    }

    @PostMapping("/{cartId}/items")
    public CartItem addItemToCart(@PathVariable int cartId, @RequestParam int productId, @RequestParam int quantity) {
        return cartService.addItemToCart(cartId, productId, quantity);
    }
}
