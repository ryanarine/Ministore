package com.ministore;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepo cr;
	
	public void add(Category c) {
		cr.save(c);
	}
	
	public Category getByName(String name) {
		return cr.findById(name).get();
	}
	
	public void delete(String name) {
		cr.deleteById(name);
	}
	
	public List<Category> getAll() {
		List<Category> res = new ArrayList<>();
		cr.findAll().forEach(res :: add);
		return res;
	}
}
