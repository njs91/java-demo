package com.example.service;

import com.example.pojo.Order;
import com.example.pojo.User;
import com.example.pojo.Product;
import com.example.util.OrderRepository;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private Order order;
    private User user;
    private Product product;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        user = new User("testUser", "testPassword", "user");
        product = new Product("testProduct", 100.0, null, "testCategory");
        order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setQuantity(1);
        order.setOrderDate(LocalDate.now());
    }

    @Test
    public void testSaveOrder() {
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Order savedOrder = orderService.saveOrder(order);

        Assertions.assertNotNull(savedOrder);
        Assertions.assertEquals("testUser", savedOrder.getUser().getUsername());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    public void testGetOrderById() {
        when(orderRepository.findById(anyInt())).thenReturn(Optional.of(order));

        Optional<Order> foundOrder = orderService.getOrderById(1);

        Assertions.assertTrue(foundOrder.isPresent());
        Assertions.assertEquals("testUser", foundOrder.get().getUser().getUsername());
    }

    @Test
    public void testGetAllOrders() {
        List<Order> orders = Arrays.asList(order, new Order());
        when(orderRepository.findAll()).thenReturn(orders);

        List<Order> allOrders = orderService.getAllOrders();

        Assertions.assertEquals(2, allOrders.size());
    }

    @Test
    public void testDeleteOrderById() {
        doNothing().when(orderRepository).deleteById(anyInt());

        orderService.deleteOrderById(1);

        verify(orderRepository, times(1)).deleteById(anyInt());
    }

    @Test
    public void testGetOrdersByDateRange() {
        List<Order> orders = Arrays.asList(order, new Order());
        when(orderRepository.findByOrderDateBetween(any(LocalDate.class), any(LocalDate.class))).thenReturn(orders);

        List<Order> filteredOrders = orderService.getOrdersByDateRange(LocalDate.now().minusDays(1), LocalDate.now());

        Assertions.assertEquals(2, filteredOrders.size());
    }

    @AfterEach
    public void tearDown() {
        order = null;
        user = null;
        product = null;
    }
}
