package com.ministore.service;

import java.util.List;

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
	
	public int getPrivledge(String username) {
		return ur.Privledge(username);
	}
	
	public Object[] getCredentials(String username, byte[] hash) {
		List<Object[]> result = ur.getCredentials(username, hash);
		return (result.isEmpty()) ? null : result.get(0); 
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
