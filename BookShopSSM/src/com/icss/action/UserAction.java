package com.icss.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.icss.biz.UserBiz;
import com.icss.entity.TUser;
import com.icss.util.Log;

@Controller
public class UserAction {
	@Autowired
	private UserBiz userBiz;
	@RequestMapping(path = "/login",method = RequestMethod.GET)
	public String login(){
		
		return "/main/login.jsp";
	}
	
	@RequestMapping(path= "/login" , method = RequestMethod.POST)
	public String login(String uname,String pwd,HttpSession session,Model model){
		String strRet;
	      try {
	    	  TUser user = userBiz.login(uname, pwd);
	    	  if(user != null){
	    		  session.setAttribute("user", user);	
	    		  strRet = "forward:/main.do";
	    	
	    	  }else{
	    		  model.addAttribute("msg", "��������û����������������������");
	    		  strRet = "/main/login.jsp";
	    	  }
	    	  
		  } catch (Exception e) {
			  Log.logger.error(e.getMessage(),e);
    		  model.addAttribute("msg", "�����쳣����͹���Ա��ϵ");
    		  strRet = "/error/error.jsp";
		  }	      
	    return strRet;  
	}
	@RequestMapping("/user/logout")
	public String logout( HttpServletRequest request){
		
		request.getSession().invalidate();
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		return "redirect:"+basePath+"/main.do";
	}
}
