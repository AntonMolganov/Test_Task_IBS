package com.example.demo;

import com.example.demo.dao.OrderDao;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class OrderController {

    @Autowired
    OrderDao dao;


    @PostMapping("/count")
    public Object count() throws Exception {
        simulateLatency();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", dao.count());
        return response;
    }

    @PostMapping("/list")
    public Object list(@RequestParam(value="start", required=false, defaultValue = "0") int start,
                       @RequestParam(value="limit", required=false, defaultValue = "0") int limit,
                       HttpServletRequest request) throws Exception {
        simulateLatency();

        System.out.println("list");

        Pair<List<Order>,Integer> p = dao.list(start, start+limit);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", p.getKey());
        response.put("total", p.getValue());
        return response;
    }

    @PostMapping("/update")
    public Object update(@RequestParam(value="id", required = true) int id,
                        @RequestParam(value="from", required=false) String from,
                        @RequestParam(value="to", required=false) String to,
                        @RequestParam(value="text", required=false) String text,
                        @RequestParam(value="state", required=false) String status) throws Exception {
        simulateLatency();

        System.out.println("update"
                                + " id:" + id
                                + " from:" + from
                                + " to:" + to
                                + " text:" + text
                                + " state:" + status);


        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", dao.update(new Order(id, from, to, text, status)));
        return response;
    }

    @PostMapping("/add")
    public Object add(@RequestParam(value="from", required=true) String from,
                     @RequestParam(value="to", required=true) String to,
                     @RequestParam(value="text", required=true) String text,
                     @RequestParam(value="state", required=true) String status) throws Exception {
        simulateLatency();


        System.out.println("add"
                + " from:" + from
                + " to:" + to
                + " text:" + text
                + " state:" + status);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", dao.add(new Order(-1, from, to, text, status)));
        return response;
    }

    @PostMapping("/delete")
    public Object delete(@RequestParam(value="id", required = true) int id) throws Exception {
        simulateLatency();

        System.out.println("delete"
                + " id:" + id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", dao.delete(id));
        return response;
    }

    @PostMapping("/dictionary")
    public Object dictionary(@RequestParam(value="name") String name) {
        simulateLatency();

        System.out.println("dictionary load: " + name);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        if (Objects.equals(name, "states")) {
            response.put("data", Order.STATE_VALUES);
        }else if (Objects.equals(name, "from")) {
            response.put("data", Order.FROM_VALUES);
        }else if (Objects.equals(name, "to")) {
            response.put("data", Order.TO_VALUES);
        }else{
            response.put("success", false);
        }
        return response;
    }

    private void simulateLatency(){
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
