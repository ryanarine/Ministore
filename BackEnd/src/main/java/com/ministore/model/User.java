package com.ministore.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class User {
	@Id
	private final String username;
	private final byte[] password;
	private String name;
	private byte[] hash;
	private final byte[] salt;
	
	private User() {
		super();
		this.username = null;
		this.password = null;
		this.name = null;
		this.hash = null;
		this.salt = null;
	}
	
	public User(String username, byte[] password, String name, byte[] hash, byte[] salt) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.hash = hash;
		this.salt = salt;
	}
	
	public byte[] getHash() {
		return hash;
	}

	public void setHash(byte[] hash) {
		this.hash = hash;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public byte[] getSalt() {
		return salt;
	}

	public byte[] getPassword() {
		return password;
	}
}
