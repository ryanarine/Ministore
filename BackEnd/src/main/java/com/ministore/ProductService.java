package com.ministore;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepo pr;
	
	public void add(Product p) {
		pr.save(p);
	}
	
	public Product getById(long id) {
		return pr.findOneById(id);
	}
	
	public void delete(long id) {
		pr.deleteById(id);
	}
	
	public void update(Product p) {
		pr.save(p);
	}
	
	public List<Product> getAll() {
		List<Product> res = new ArrayList<>();
		pr.findAll().forEach(res :: add);
		return res;
	}
}
