package com.ministore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
	
	@Id @GeneratedValue
	private long id;
	
	private String name, category;
	private double weight, price;
	
	public Product() {
		super();
		this.name = null;
		this.weight = 0;
		this.category = null;
		this.price = 0;
	}
	
	public Product(String name, double weight, String category, double price) {
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

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
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
