package com.ministore;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
	@Autowired
	private CategoryService cs;
	
	@RequestMapping(method = RequestMethod.POST, value ="/category/add")
	public void add(@RequestBody Category c) {
		cs.add(c);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/category/all")
	public List<Category> get() {
		return cs.getAll();
	}
}
