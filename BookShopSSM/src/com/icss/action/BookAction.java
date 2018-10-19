package com.icss.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.icss.biz.BookBiz;
import com.icss.entity.TBook;
import com.icss.util.Log;

@Controller
public class BookAction {
	@Autowired
	private BookBiz bookBiz;
	@RequestMapping("/main")
	public String getAllBooks(Model model){
		String strRet;
		
		try {
			List<TBook> books = bookBiz.getAllBooks();
			model.addAttribute("books",books);
			strRet = "main/main.jsp";
		} catch (Exception e) {
			Log.logger.error(e.getMessage(), e);
			model.addAttribute("msg", "�����쳣����͹���Ա��ϵ");
			strRet = "/error/error.jsp";
		}
		return strRet;
	}
	
	@RequestMapping("/pic")
	@ResponseBody
	public byte[] getPic(String isbn){
		byte[] pic = null;
		if(isbn != null){
			
			try {
		    	   pic = bookBiz.getPic(isbn);
		    	  
			  } catch (Exception e) {
				 
			  }	 
		}
		return pic;
	}
	
	@RequestMapping("/detail")
	public String getBookInfo(String isbn,Model model){
		String strRet; 
		if(isbn != null){
			
			try {
				TBook book = bookBiz.getBookInfo(isbn);
				model.addAttribute("book", book);
				strRet = "/main/BookDetail.jsp";
			} catch (Exception e) {
				Log.logger.error(e.getMessage(), e);
				model.addAttribute("msg", "�����쳣����͹���Ա��ϵ");
				strRet ="/error/error.jsp";
			}			
		}else{
			model.addAttribute("msg", "���isbn����Ϊ�գ�");
			strRet ="/error/error.jsp";
	    }
		return strRet;
	}
	
}
