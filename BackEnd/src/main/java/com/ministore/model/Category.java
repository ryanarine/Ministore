package com.ministore.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {
	@Id
	private String name;
	private long products;
	
	public Category() {
		super();
		this.name = "Default";
	}
	
	public Category(String name) {
		super();
		this.name = name;
	}
	
	public long getProducts() {
		return products;
	}

	public void setProducts(long products) {
		this.products = products;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


}
