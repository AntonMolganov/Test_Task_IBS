package com.example.demo.dao;

import com.example.demo.Order;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class SimpleInMemoryDaoImpl implements OrderDao {

    private volatile AtomicInteger lastId;
    private final Map<Integer,Order> data = new HashMap<>();


    public SimpleInMemoryDaoImpl() {
        //initial fill with random data
        Random random = new SecureRandom();
        for (int i = 0; i < 1000; i++){
            try {
                add(new Order(
                        -1,
                        Order.FROM_VALUES[random.nextInt(Order.FROM_VALUES.length)],
                        Order.TO_VALUES[random.nextInt(Order.TO_VALUES.length)],
                        RandomStringUtils.randomAlphanumeric(30),
                        Order.STATE_VALUES[random.nextInt(Order.STATE_VALUES.length)]
                    )
                );
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public Integer count() {
        synchronized (data){
            return data.size();
        }
    }

    @Override
    public Pair<List<Order>, Integer> list(int from, int to) {
        List<Order> l;
        int count;

        synchronized (data){
            l = new LinkedList<>(data.values());
            count = data.size();
        }

        if (from < 0) from = 0;
        if (from > l.size()) from = l.size();
        if (to < 0 || to > l.size()) to = l.size();

        if (from > to) {
            int t = from;
            from = to;
            to = t;
        }

        return new ImmutablePair<>(l.subList(from, to), count);
    }

    @Override
    public Order details(int id) throws DaoException {
        Order o;
        synchronized (data){
            o = data.get(id);
        }
        if (o == null) throw new DaoException("No such order");
        return o;
    }

    @Override
    public Order update(Order order) throws DaoException {
        synchronized (data){
            if (data.get(order.getId()) == null) throw new DaoException("Order not exist");
            data.put(order.getId(), order);
        }
        return order;
    }

    @Override
    public Order add(Order dto) throws DaoException {
        synchronized (data){
            if (lastId == null) lastId = new AtomicInteger(0);
            if (lastId.get() < Integer.MAX_VALUE){
                lastId.incrementAndGet();
                Order orderToInsert = new Order(lastId.get(), dto.getFrom(), dto.getTo(), dto.getText(), dto.getState());
                data.put(lastId.get(), orderToInsert);
                return  orderToInsert;
            }else{
                throw new DaoException("Database ids ended");
            }
        }
    }

    @Override
    public Order delete(int id) throws DaoException {
        synchronized (data){
            Order orderToRemove  = data.get(id);
            if (orderToRemove == null) throw new DaoException("Order not exist");
            data.remove(id);
            return orderToRemove;
        }
    }
}
