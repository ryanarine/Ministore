package com.ministore.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	private final String username;
	private final byte[] password;
	private String name;
	private byte[] hash;
	private final byte[] salt;
	private int privledge;
	private double money;

	public static final int MASTER = 0;
	public static final int STAFF = 1;
	public static final int CUSTOMER = 2;

	private User() {
		super();
		this.username = null;
		this.password = null;
		this.name = null;
		this.hash = null;
		this.salt = null;
		this.privledge = CUSTOMER;
		this.money = 0;
	}

	public User(String username, byte[] password, String name, byte[] hash, byte[] salt) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.hash = hash;
		this.salt = salt;
		this.privledge = CUSTOMER;
		this.money = 0;
	}
	
	public String getUsername() {
		return username;
	}
	
	public byte[] getPassword() {
		return password;
	}
	
	public String getName() {
		return name;
	}

	public byte[] getHash() {
		return hash;
	}
	
	public byte[] getSalt() {
		return salt;
	}
	
	public int getPrivledge() {
		return privledge;
	}

	public double getMoney() {
		return money;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void setHash(byte[] hash) {
		this.hash = hash;
	}

	public void setPrivledge(int privledge) {
		if (privledge < MASTER || privledge > CUSTOMER) {
			throw new IllegalArgumentException("Invalid privledge");
		}
		this.privledge = privledge;
	}

	public void setMoney(double money) {
		this.money = money;
	}
}
