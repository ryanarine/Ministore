package com.ministore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ministore.model.Product;
import com.ministore.repo.CategoryRepo;
import com.ministore.repo.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepo pr;
	@Autowired
	private CategoryRepo cr;
	
	public void add(Product p, String category) {
		pr.save(p);
		cr.increment(category);
	}
	
	public Product getById(long id) {
		return pr.findOneById(id);
	}
	
	public void delete(long id) {
		String category = pr.getCategoryById(id);
		pr.deleteById(id);
		cr.decrement(category);
	}
	
	public void update(Product p) {
		pr.save(p);
	}
	
	public List<Product> getAll() {
		List<Product> res = new ArrayList<>();
		pr.sortAll().forEach(res :: add);
		return res;
	}
	
	public List<Product> filterCategory(String category) {
		List<Product> res = new ArrayList<>();
		pr.filterCategory(category).forEach(res :: add);
		return res;
	}
	
	public List<Product> filterSearch(String search) {
		List<Product> res = new ArrayList<>();
		pr.filterSearch(search).forEach(res :: add);
		return res;
	}
	
	public List<Product> filterCategoryAndSearch(String category, String search) {
		List<Product> res = new ArrayList<>();
		pr.filterCategoryAndSearch(category, search).forEach(res :: add);
		return res;
	}
}
