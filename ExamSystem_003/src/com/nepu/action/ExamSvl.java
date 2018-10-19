package com.nepu.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.ExamBiz;
import com.nepu.biz.ResultBiz;
import com.nepu.util.Log;

/**
 * Servlet implementation class ExamSvl
 */
@WebServlet("/ExamSvl")
public class ExamSvl extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExamSvl() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String pno=request.getParameter("pno");
		String uno=request.getParameter("uno");
		String qnos[]=request.getParameterValues("qno");
		String stuanswers[]=new String[qnos.length];
		
		ExamBiz biz = new ExamBiz();
		ResultBiz rbiz = new ResultBiz();
		
		for(int j=0;j<qnos.length;j++){
			stuanswers[j]=request.getParameter(qnos[j]);
		}		
		try {
			for(int i=0;i<qnos.length;i++){
				biz.exam(pno,qnos[i],stuanswers[i],uno);
			}
			rbiz.addResult(uno, pno);
			request.getRequestDispatcher("student/Main2.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}
