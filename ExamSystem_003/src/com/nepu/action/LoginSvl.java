package com.nepu.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.UserBiz;
import com.nepu.entity.User;
import com.nepu.util.Log;



/**
 * Servlet implementation class UserSvl
 */
@WebServlet("/LoginSvl")
public class LoginSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginSvl() {
        super();
    }
    
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		 request.getRequestDispatcher("/Login.jsp").forward(request, response);
	}
	
	  

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	      String uno = request.getParameter("uno");
	      String pwd = request.getParameter("pwd");
	      UserBiz biz = new UserBiz();
	      
	      try {
	    	  User user = biz.login(uno, pwd);
	    	  
	    	  if(user != null){
	    		  request.getSession().setAttribute("user", user);	
	    		  if(user.getRole()==1){
	    			  //different role for different Page
	    			  request.getRequestDispatcher("/manager/Main1.jsp").forward(request, response);  
	    		  }else if(user.getRole()==2){
	    			  request.getRequestDispatcher("/student/Main2.jsp").forward(request, response);  
	    		  }else{
	    			  request.getRequestDispatcher("/teacher/Main3.jsp").forward(request, response);  
	    		  }
	    	  }else{
	    		  request.setAttribute("msg", "uno or password wrong ,Please try again!");
	    		  request.getRequestDispatcher("/Login.jsp").forward(request, response);  
	    	  }
	    	  
		  } catch (Exception e) {
			  Log.logger.error(e.getMessage(),e);
			  request.setAttribute("msg", "Network error Please call admin!");
			  request.getRequestDispatcher("/error.jsp").forward(request, response);		 
		  }	      
	}

}
