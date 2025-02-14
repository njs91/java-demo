package com.example.service;

import com.example.pojo.Cart;
import com.example.pojo.CartItem;
import com.example.pojo.Product;
import com.example.pojo.User;
import com.example.util.CartItemRepository;
import com.example.util.CartRepository;
import com.example.util.ProductRepository;
import com.example.util.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CartService cartService;

    private User user;
    private Cart cart;
    private Product product;
    private CartItem cartItem;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        user = new User("testUser", "testPassword", "user");
        cart = new Cart();
        cart.setUser(user);
        product = new Product("testProduct", 100.0, null, "testCategory");
        cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(1);
    }

    @Test
    public void testCreateCart() {
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(user));
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart createdCart = cartService.createCart(1);

        Assertions.assertNotNull(createdCart);
        Assertions.assertEquals("testUser", createdCart.getUser().getUsername());
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

    @Test
    public void testAddItemToCart() {
        when(cartRepository.findById(anyInt())).thenReturn(Optional.of(cart));
        when(productRepository.findById(anyInt())).thenReturn(Optional.of(product));
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        CartItem addedCartItem = cartService.addItemToCart(1, 1, 1);

        Assertions.assertNotNull(addedCartItem);
        Assertions.assertEquals("testProduct", addedCartItem.getProduct().getName());
        verify(cartItemRepository, times(1)).save(any(CartItem.class));
    }

    @Test
    public void testGetOrCreateCart() {
        when(cartRepository.findByUserId(anyInt())).thenReturn(Optional.of(cart));

        Cart foundCart = cartService.getOrCreateCart(1);

        Assertions.assertNotNull(foundCart);
        Assertions.assertEquals("testUser", foundCart.getUser().getUsername());
    }

    @Test
    public void testGetCartIdByUserId() {
        when(cartRepository.findByUserId(anyInt())).thenReturn(Optional.of(cart));

        int cartId = cartService.getCartIdByUserId(1);

        Assertions.assertEquals(cart.getId(), cartId);
    }

    @Test
    public void testGetCartItems() {
        List<CartItem> cartItems = Arrays.asList(cartItem, new CartItem());
        when(cartItemRepository.findByCartId(anyInt())).thenReturn(cartItems);

        List<CartItem> foundCartItems = cartService.getCartItems(1);

        Assertions.assertEquals(2, foundCartItems.size());
    }

    @AfterEach
    public void tearDown() {
        user = null;
        cart = null;
        product = null;
        cartItem = null;
    }
}
