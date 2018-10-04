package com.example.demo.dao;

import com.example.demo.Order;
import org.apache.commons.lang3.tuple.Pair;

import java.util.List;

public interface OrderDao {


    Integer count()  throws DaoException;

    Pair<List<Order>, Integer> list(int from, int to)  throws DaoException;

    Order details(int id) throws DaoException;

    Order update(Order order)  throws DaoException;

    Order add(Order order) throws DaoException;

    Order delete(int id) throws DaoException;

}
