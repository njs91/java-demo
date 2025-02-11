package com.example.service;

import com.example.pojo.Cart;
import com.example.pojo.CartItem;
import com.example.pojo.Product;
import com.example.pojo.User;
import com.example.util.CartItemRepository;
import com.example.util.CartRepository;
import com.example.util.ProductRepository;
import com.example.util.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart createCart(int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            Cart cart = new Cart();
            cart.setUser(userOptional.get());
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public CartItem addItemToCart(int cartId, int productId, int quantity) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        Optional<Product> productOptional = productRepository.findById(productId);
        if (cartOptional.isPresent() && productOptional.isPresent()) {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cartOptional.get());
            cartItem.setProduct(productOptional.get());
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart or Product not found");
        }
    }
}
