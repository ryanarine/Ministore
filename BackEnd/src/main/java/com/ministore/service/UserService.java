package com.ministore.service;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ministore.Passwords;
import com.ministore.model.User;
import com.ministore.repo.UserRepo;

@Service
public class UserService {
	@Autowired
	private UserRepo ur;
		
	public boolean hasUser(String username) {
		return ur.existsById(username);
	}
	
	public boolean validHash(String username, String hash) {
		if (username == null || hash == null) {
			return false;
		}
		byte [] actualHash = ur.getHash(username);
		return (actualHash == null) ? false : Arrays.equals(actualHash, hash.getBytes());
	}
	
	public void deposit(String username, double deposit) {
		ur.increaseMoney(username, deposit);
	}
	
	public boolean buy(String username, double price, int quantity) {
		if (ur.getMoney(username) < price * quantity) {
			return false; 
		}
		ur.increaseMoney(username, price * quantity * -1);
		return true;
	}
	
	public boolean isStaff(HttpServletRequest req) {
		return isUserAllowed(req.getParameter("username"), req.getParameter("hash"), User.STAFF);
	}
	
	public boolean isMaster(HttpServletRequest req) {
		return isUserAllowed(req.getParameter("username"), req.getParameter("hash"), User.MASTER);
	}
	
	public boolean isUserAllowed(String username, String hash, int value) {
		return validHash(username, hash) && ur.getPrivledge(username) <= value;
	}
	
	public String getName(String username) {
		return ur.getName(username);
	}
	
	public int getPrivledge(String username) {
		return ur.getPrivledge(username);
	}
	
	public double getWallet(String username) {
		return ur.getMoney(username);
	}
	
	public List<Object[]> getNonMasterUsers(){
		return ur.getNonMasterUsers(User.MASTER);
	}
	
	public void add(String username, byte[] password, String name) {
		byte[] salt = Passwords.getNextSalt();
		char[] psw = new char[password.length];
		for (int i = 0; i < password.length; i++) {
			psw[i] = (char) password[i];
		}
		User u = new User(username, Passwords.hash(psw, salt), name, null, salt);
		ur.save(u);
	}
	
	public void changePrivledge(String username, int privledge) {
		ur.changePrivledge(username, privledge);
	}
	
	public boolean isValidUser(String username, String password) {
		if (!hasUser(username)) {
			return false;
		}
		return (Passwords.isExpectedPassword(password.toCharArray(), ur.getSalt(username), ur.getPassword(username)));
	}
	
	public byte[] updateHash(String username) {
		byte[] hash = Passwords.getNextHash();
		ur.setHash(username, hash);
		return hash;
	}
}
