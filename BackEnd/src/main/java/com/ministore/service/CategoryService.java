package com.ministore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ministore.model.Category;
import com.ministore.repo.CategoryRepo;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepo cr;
	
	public void add(Category c) {
		cr.save(c);
	}
	
	public boolean has(String name) {
		return  !cr.findById(name).isEmpty();
	}
	
	public boolean delete(String name) {
		System.out.println(cr.countProducts(name));
		if (cr.countProducts(name) == 0) {
			cr.deleteById(name);
			return true;
		}
		return false;
	}
	
	public List<Category> getAll() {
		List<Category> res = new ArrayList<>();
		cr.findAll().forEach(res :: add);
		return res;
	}
}
