package com.ministore.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ministore.model.Product;
import com.ministore.service.ProductService;

@RestController
public class ProductController {
	@Autowired
	private ProductService ps;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, value ="/product/add")
	public void add(HttpServletRequest req, HttpServletResponse res) {
		String name = req.getParameter("name");
		String category = req.getParameter("category");
		String price = req.getParameter("price");
		String weight = req.getParameter("weight");
		Product p = new Product(name, weight, category, price);
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
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.DELETE, value ="/product/delete")
	public void delete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		long id = Long.parseLong(req.getParameter("id"));
		if (ps.getById(id) != null) {
			ps.delete(id);
		}
		else {
			PrintWriter out = res.getWriter();
			out.print(500);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/category/{category}")
	public List<Product> filterProductsByCategory(@PathVariable String category){
		return ps.filterCategory(category);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/search/{search}")
	public List<Product> filterProductsbySearch(@PathVariable String search){
		return ps.filterSearch(search);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/product/categorysearch/{category}/{search}")
	public List<Product> filterProductsbySearch(@PathVariable String category, @PathVariable String search){
		return ps.filterCategoryAndSearch(category, search);
	}
}
