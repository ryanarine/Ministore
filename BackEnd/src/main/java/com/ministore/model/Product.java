package com.ministore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
	
	@Id @GeneratedValue
	private long id;
	
	private String name, weight, category, price;
	
	public Product() {
		super();
		this.name = "Default";
		this.weight = "Default";
		this.category = "Default";
		this.price = "Default";
	}
	
	public Product(String name, String weight, String category, String price) {
		super();
		this.name = name;
		this.weight = weight;
		this.category = category;
		this.price = price;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public long getId() {
		return id;
	}
	
	@Override
	public String toString() {
		return("ID: " + this.id + " Name: " + this.name + " Category: " + this.category + " Weight: " + this.weight + " Price:" + this.price);
	}
}
