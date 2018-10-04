package com.example.demo;

public class Order {

    public final static String[] STATE_VALUES = new String[]{
            "new",
            "in progress",
            "resolved",
            "feedback",
            "closed",
            "rejected"};

    public final static String[] FROM_VALUES = new String[]{
            "Kia Nichols",
            "Mertie Langstaff",
            "Madaline Hymas",
            "Maynard Mountjoy",
            "Shela Rothrock",
            "Zenobia Schiffman",
            "Marco Kauffman",
            "Candance Chretien",
            "Akilah Timko",
            "Danita Marcinkowski",
            "Shauna Woelfel",
            "Nettie Dafoe",
            "Chassidy Seymore",
            "Janie Cutler",
            "Lakeesha Zuchowski",
            "Harris Goetzinger",
            "Soila Muriel",
            "Phylis Clink",
            "Taylor Chapdelaine",
            "Bree Mizell",
            "Clarinda Oliveri",
            "Piedad Bleau",
            "Lester Mickley",
            "Marcie Rennick",
            "Sunni Natoli"
    };

    public final static String[] TO_VALUES = new String[]{
            "Matthew Browne",
            "Lucy Pettway",
            "Kellye Levitan",
            "Frances Rodriguez",
            "Camellia Yutzy",
            "Rene Buster",
            "Trang Deady",
            "Vivian Pang",
            "Evelyne Frazer",
            "Keiko Rosa",
            "Margy Connally",
            "Arnetta Gwozdz",
            "Inge Lovato",
            "Susanna Samson",
            "Robert Zielinski",
            "Daisy Hermsen",
            "Drusilla Munz",
            "Rosalinda Huie",
            "Dick Racicot",
            "Karrie Auston",
            "Clelia Vasconcellos",
            "Deloras Fontanez",
            "Carmen Walke",
            "Edgardo Sisemore",
            "Wilfredo Remington",
    };


    private final int id;
    private final String from;
    private final String to;
    private final String text;
    private final String state;

    public Order(int id, String from, String to, String text, String state) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.text = text;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getText() {
        return text;
    }

    public String getState() {
        return state;
    }

}
