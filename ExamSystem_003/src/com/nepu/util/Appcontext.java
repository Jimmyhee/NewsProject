package com.nepu.util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Appcontext {
private static ApplicationContext context;          //Spring����������
	
	static {		
		try {			
			context = new ClassPathXmlApplicationContext("beans.xml");		
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}	

	public static Object getBean(String bname) {
		return context.getBean(bname);                     //��Spring������ȡbean����
	}
	
}
