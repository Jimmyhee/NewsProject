package com.icss.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import com.icss.entity.IRole;
import com.icss.entity.TUser;

/**
 * Servlet Filter implementation class AdminFilter
 */
@WebFilter(urlPatterns="/back/*")
public class AdminFilter implements Filter {

    /**
     * Default constructor. 
     */
    public AdminFilter() {
    	System.out.println("AdminFilter  start");
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
	
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		//1. �û������Ѿ���¼
		//2. �ѵ�¼�û������й���Ա��Ȩ��
		HttpServletRequest req = (HttpServletRequest)request;
		Object obj = req.getSession().getAttribute("user");
		if(obj == null){
			req.setAttribute("msg", "����Ȩ���ʣ����ȵ�¼");
			req.getRequestDispatcher("/login.jsp").forward(req, response);
		}else{
			//�ж�Ȩ��
			TUser user = (TUser)obj;
			if(user.getRole() == IRole.ADMIN){
				chain.doFilter(request, response);                    //����ԭ��������	
			}else{
				req.setAttribute("msg", "����Ȩ���ʣ������µ�¼");
				req.getRequestDispatcher("/login.jsp").forward(req, response);
			}						
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
