class Product {
    private String partA;
    private String partB;

    public void setPartA(String partA) { this.partA = partA; }
    public void setPartB(String partB) { this.partB = partB; }

    public String toString() {
        return "Product with: " + partA + ", " + partB;
    }
}

interface Builder {
    void buildPartA();
    void buildPartB();
    Product getResult();
}

class ConcreteBuilder implements Builder {
    private Product product = new Product();

    public void buildPartA() {
        product.setPartA("Part A");
    }

    public void buildPartB() {
        product.setPartB("Part B");
    }

    public Product getResult() {
        return product;
    }
}

class Director {
    public Product construct(Builder builder) {
        builder.buildPartA();
        builder.buildPartB();
        return builder.getResult();
    }
}

public class Main {
    public static void main(String[] args) {
        Director director = new Director();
        Builder builder = new ConcreteBuilder();
        Product product = director.construct(builder);
        System.out.println(product);
    }
}
