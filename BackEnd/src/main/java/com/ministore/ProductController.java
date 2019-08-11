package com.ministore;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	@Autowired
	private ProductService ps;
	
	@RequestMapping(method = RequestMethod.POST, value ="/product/add")
	public void add(@RequestBody Product p) {
		ps.add(p);
	}
	
	@RequestMapping("/product/{id}")
	public Product get(@PathVariable long id) {
		return ps.getById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/all")
	public List<Product> get() {
		return ps.getAll();
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value ="/product/{id}")
	public void delete(@PathVariable long id) {
		ps.delete(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/filter/{category}")
	public List<Product> filterProducts(@PathVariable String category){
		return ps.filter(category);
	}
}
