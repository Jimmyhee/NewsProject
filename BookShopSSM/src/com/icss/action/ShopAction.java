package com.icss.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.icss.biz.BookBiz;
import com.icss.entity.TBook;
import com.icss.util.Log;

@Controller
@RequestMapping("/user")
public class ShopAction {
	
	@Autowired
	private BookBiz bookBiz;
	
	@RequestMapping("/removeshopcar")
	public String  removeShopCar(String isbn,HttpSession session,Model model){
		String strRet;
		if(isbn != null){
			Object shopcar = session.getAttribute("shopcar");
			if(shopcar != null){
				Map<String,Integer> car =  (Map<String,Integer>)shopcar;
				car.remove(isbn);
				strRet = "forward:/user/shopcar.do";
			}else{
				model.addAttribute("msg", "�쳣���ʣ���ӹ��ﳵ����");
				strRet = "/error/error.jsp";
			}		
		}else{
			model.addAttribute("msg", "���isbn����Ϊ��");
			strRet = "/error/error.jsp";
		}
		return strRet;
	}
	@RequestMapping("/addshopcar")
	public String addShopCar(String isbn,HttpSession session,Model model){
		String strRet;
   	  if(isbn != null){
   		  //�ӵ�session�еĹ��ﳵ��
   		  Object shopcar = session.getAttribute("shopcar");
   		  if(shopcar == null){
   			  Map<String,Integer> car = new HashMap<String,Integer>();
   			  car.put(isbn, 1);
   			  session.setAttribute("shopcar", car);
   		  }else{
   			  Map<String,Integer> car =  (Map<String,Integer>)shopcar;
   			  car.put(isbn, 1);        		  
   		  }        		  
   		  //��ʾ���ﳵ�е�����
   		  strRet = "forward:/user/shopcar.do";
   	  }else{
   		  model.addAttribute("msg", "isbn������ʧ");
   		  strRet = "/error/error.jsp";
   	  }
   	  return strRet;
	}
	
	@RequestMapping("/shopcar")
	public String getCarBooks(HttpSession session,Model model){
		String strRet ;
		 Object shopcar = session.getAttribute("shopcar");
		  if(shopcar != null){
			 //��ȡ���ﳵ�е�����
			  Map<String,Integer> car =  (Map<String,Integer>)shopcar;
			  try {
				  List<TBook> books = bookBiz.getCarBooks(car.keySet());
				  model.addAttribute("books", books);
				  strRet = "/main/shopcar.jsp";
			  } catch (Exception e) {
				  Log.logger.error(e.getMessage(), e);
				  model.addAttribute("msg", "�����쳣����͹���Ա��ϵ");
				  strRet = "/error/error.jsp";
			 }				  
		  }else{
			  strRet = "/main/shopcar.jsp";
		  }
		  return strRet;
	}
	
	
}
