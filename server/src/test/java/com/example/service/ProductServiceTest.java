package com.example.service;

import com.example.pojo.Product;
import com.example.util.ProductRepository;
import com.example.util.CartItemRepository;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private MultipartFile imageFile;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        product = new Product("testProduct", 100.0, null, "testCategory");
    }

    @Test
    public void testSaveProduct() throws IOException {
        when(imageFile.getBytes()).thenReturn(new byte[] { 1, 2, 3 });
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product savedProduct = productService.saveProduct(product, imageFile);

        Assertions.assertNotNull(savedProduct);
        Assertions.assertEquals("testProduct", savedProduct.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void testGetProductById() {
        when(productRepository.findById(anyInt())).thenReturn(Optional.of(product));

        Optional<Product> foundProduct = productService.getProductById(1);

        Assertions.assertTrue(foundProduct.isPresent());
        Assertions.assertEquals("testProduct", foundProduct.get().getName());
    }

    @Test
    public void testGetAllProducts() {
        List<Product> products = Arrays.asList(product, new Product("testProduct2", 200.0, null, "testCategory2"));
        when(productRepository.findAll()).thenReturn(products);

        List<Product> allProducts = productService.getAllProducts();

        Assertions.assertEquals(2, allProducts.size());
        Assertions.assertEquals("testProduct", allProducts.get(0).getName());
    }

    @Test
    public void testDeleteProductById() {
        doNothing().when(cartItemRepository).deleteByProductId(anyInt());
        doNothing().when(productRepository).deleteById(anyInt());

        productService.deleteProductById(1);

        verify(cartItemRepository, times(1)).deleteByProductId(anyInt());
        verify(productRepository, times(1)).deleteById(anyInt());
    }

    @AfterEach
    public void tearDown() {
        product = null;
    }
}
