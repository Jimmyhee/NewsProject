package com.nepu.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nepu.biz.CourseBiz;
import com.nepu.biz.CouteaBiz;
import com.nepu.biz.ManagerBiz;
import com.nepu.biz.StudentBiz;
import com.nepu.biz.TeacherBiz;
import com.nepu.entity.Course;
import com.nepu.entity.Manager;
import com.nepu.entity.Student;
import com.nepu.entity.Teacher;
import com.nepu.util.Log;
@WebServlet("/ManagerSvl")
public class ManagerSvl extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String operate = request.getParameter("operate");
		
		if(operate.equals("queryManager")){
			this.doQueryManager(request, response);		//Query manager
		}else if(operate.equals("addteacher")){
			this.doAddTeacher(request, response);		//Add teacher
		}else if(operate.equals("addstudent")){
    		this.doAddStudent(request, response);		//Add student
    	}else if(operate.equals("deleteteacher")){
			this.doDeleteTeacher(request, response);	//Delete teacher
		}else if(operate.equals("deletestudent")){
    		this.doDeleteStudent(request,response);		//Delete student
    	}else if(operate.equals("updatemanager")){
			this.doUpdateManager(request, response);	//Update information of manager
		}else if(operate.equals("updateteacher")){
			this.doUpdateTeacher(request, response);	//Update information of teacher
		}else if(operate.equals("updatestudent")){
			this.doUpdateStudent(request, response);	//Update information of student
		}else if(operate.equals("queryteacherByUno")){
			this.doQueryTeacherByUno(request, response);	//Query teacher by uno
		}else if(operate.equals("querystudentByUno")){
			this.doQueryStudentByUno(request, response);	//Query student by uno
		}else if(operate.equals("delAllTeacher")){
    		this.doDelAllTeacher(request, response);	//Batch delete teacher
    	}else if(operate.equals("delAllStudent")){
    		this.doDelAllStudent(request, response);	//Batch delete student
    	}else if(operate.equals("deletecourse")){
    		this.doDeleteCourse(request,response);		//Delete course
    	}else if(operate.equals("querycourseByCno")){
    		this.doQueryCourseByCno(request,response);	//Query course by cno
    	}else if(operate.equals("updatecourse")){
    		this.doUpdateCourse(request,response);		//Update information of course
    	}else if(operate.equals("addcourse")){
    		this.doAddCourse(request, response);		//Add course
    	}else if(operate.equals("deletecouage")){
        	this.dodeleteCouage(request, response);		//Delete information of arrangement
    	}else if(operate.equals("addcoutea")){
    		this.doAddCoutea(request, response);		//Arrange teach
    	}else if(operate.equals("delAllCoutea")){
    		this.doDelAllCoutea(request, response);		//Batch delete information of arrangement
    	}else if(operate.equals("delAllCourse")){
    		this.doDelAllCourse(request, response);		//Batch delete information of course
    	}
	}
	/**
	 * update teacher
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateTeacher(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		String tname  = request.getParameter("tname");
		String tphone = request.getParameter("tphone");
		
		TeacherBiz tbiz = new TeacherBiz();
		
		try{
			tbiz.updateTeacher(uno,tname,tphone);	
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/TeacherQuerySvl?operate=queryteacher&&uno=&&tname=").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
		
	
	/**
	 * delete teacher
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDeleteTeacher(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		TeacherBiz tbiz = new  TeacherBiz();
		
		try {
			tbiz.deleteTeacher(uno);
			request.getRequestDispatcher("/TeacherQuerySvl?operate=queryteacher&&uno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	
	/**
	 * add teacher
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddTeacher(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String tname = request.getParameter("tname");
		String uno  = request.getParameter("uno");
		String tphone =request.getParameter("tphone"); 
		
		Teacher teacher = new Teacher();
		teacher.setUno(uno);
		teacher.setTname(tname);
		teacher.setTphone(tphone);
		
		TeacherBiz tbiz = new TeacherBiz();
				
		try{
			tbiz.addTeacher(teacher);
			request.setAttribute("msg", "Add success Go ahead please");
			request.getRequestDispatcher("/manager/Manager_teacheradd.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}	
	}

	/**
	 * query manager by uno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryManager(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno =request.getParameter("uno");
		
		ManagerBiz mbiz = new ManagerBiz();
		
		try{
			Manager manager = mbiz.getManager(uno);
			
			request.setAttribute("manager", manager);
			request.getRequestDispatcher("/manager/Manager_UpdateInfo.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	
	
	/**
	 * query teacher by uno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryTeacherByUno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String uno = request.getParameter("uno");
		
		TeacherBiz tbiz = new TeacherBiz();
		
		try {
			Teacher teacher = tbiz.getTeacherByUno(uno);
			
			request.setAttribute("teacher", teacher);
			request.getRequestDispatcher("/manager/Manager_teacherupdate.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	/**
	 * update manager
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateManager(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uno = request.getParameter("uno");
		String mname = request.getParameter("mname");
		String mphone = request.getParameter("mphone");
		
		Manager manager = new Manager();
		manager.setUno(uno);
		manager.setMname(mname);
		manager.setMphone(mphone);
		
		ManagerBiz mbiz = new ManagerBiz();

		try{
			mbiz.UpdateManager(manager);
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/index.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	
	/**
	 * add student
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String sname = request.getParameter("sname");
		String uno  = request.getParameter("uno");
		String sphone =request.getParameter("sphone"); 
		
		Student student = new Student();
		student.setUno(uno);
		student.setSname(sname);
		student.setSphone(sphone);
		
		StudentBiz sbiz = new StudentBiz();
		
		try{
			sbiz.addStudent(student);
			request.setAttribute("msg", "Add success Go ahead please");
			request.getRequestDispatcher("/manager/Manager_studentadd.jsp").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}


	/**
	 * delete all teachers
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDelAllTeacher(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String valAll=request.getParameter("valAll");  	
    	String[] unos=valAll.split("@");
    	
    	TeacherBiz biz = new TeacherBiz();
    	
    	try {
        	for (String uno : unos) {
    			biz.deleteTeacher(uno);
    		}
        	request.getRequestDispatcher("/TeacherQuerySvl?operate=queryteacher&&uno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * delete student
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDeleteStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		
		StudentBiz sbiz = new  StudentBiz();
		try {
			sbiz.deleteStudent(uno);
			request.getRequestDispatcher("/StudentQuerySvl?operate=querystudent&&uno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * query student by uno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryStudentByUno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		
		StudentBiz tbiz = new StudentBiz();
		try {
			Student student = tbiz.getStudentByUno(uno);
			
			request.setAttribute("student", student);
			request.getRequestDispatcher("/manager/Manager_studentupdate.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
		
	}
	
	/**
	 * update student
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uno = request.getParameter("uno");
		String sname  = request.getParameter("sname");
		String sphone = request.getParameter("sphone");
		
		StudentBiz sbiz = new StudentBiz();
		
		try{
			sbiz.updateStduent(uno,sname,sphone);	
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/StudentQuerySvl?operate=querystudent&&uno=&&sname=").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}	

	/**
	 * delete all students
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDelAllStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String valAll=request.getParameter("valAll");  	
    	String[] unos=valAll.split("@");
    	
    	StudentBiz sbiz = new StudentBiz();
    	
    	try {
        	for (String uno : unos) {
    			sbiz.deleteStudent(uno);
    		}
        	request.getRequestDispatcher("/StudentQuerySvl?operate=querystudent&&uno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	/**
	 * delete course
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDeleteCourse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cno = request.getParameter("cno");
		
		CourseBiz cbiz = new  CourseBiz();
		
		try {
			cbiz.deleteCourse(cno);
			request.getRequestDispatcher("/CourseQuerySvl?operate=querycourse&&cno=").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

	/**
	 * qquery course by cno
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doQueryCourseByCno(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cno = request.getParameter("cno");
		
		CourseBiz cbiz = new CourseBiz();
		
		try {
			Course course = cbiz.getCourseByUno(cno);
			
			request.setAttribute("course", course);
			request.getRequestDispatcher("/course/updatecourse.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg","Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	 * update courseInfo
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateCourse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cno = request.getParameter("cno");
		String cname  = request.getParameter("cname");
		String cremark = request.getParameter("cremark");
		
		CourseBiz cbiz = new CourseBiz();
		
		try{
			cbiz.updateCourse(cno,cname,cremark);	
			request.setAttribute("msg", "Update success");
			request.getRequestDispatcher("/CourseQuerySvl?operate=querycourse&&cname=").forward(request, response);
		}catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	 * add course
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddCourse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cno=request.getParameter("cno");
		String cname=request.getParameter("cname");
		String cremark=request.getParameter("cremark");
		
		Course course = new Course();
		course.setCno(cno);
		course.setCname(cname);
		course.setCremark(cremark);
		
		CourseBiz biz = new CourseBiz();
		
		try {
			biz.addCourse(course);
			request.setAttribute("msg", "Add success Go ahead please");
			request.getRequestDispatcher("/course/addcourse.jsp").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

	
	/**
	 * arrange teach
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAddCoutea(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cno = request.getParameter("cno");
		String uno = request.getParameter("uno");
		
		CouteaBiz biz = new CouteaBiz();
		
		try {
			biz.addArrange(cno, uno);
			request.getRequestDispatcher("/CourseArrangeSvl").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

	/**
	 * delete coursearrangement by ctid
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void dodeleteCouage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String ctid = request.getParameter("ctid");
		String cno = request.getParameter("cno");
		String uno =request.getParameter("uno");
		
		CouteaBiz ctbiz = new  CouteaBiz();
		
		try {
			ctbiz.deleteCouage(ctid,cno,uno);
			request.getRequestDispatcher("/CourseArrangeSvl").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

	
	/**
	 * delete all coutea
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDelAllCoutea(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String valAll=request.getParameter("valAll");  	
    	String[] ctids=valAll.split("@");
    	
    	CouteaBiz biz = new CouteaBiz();
    	
    	try {
        	for (String ctid : ctids) {
    			biz.deleteCouage(ctid,null,null);
    		}
        	request.getRequestDispatcher("/CourseArrangeSvl").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}
	
	/**
	 * delete all course
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDelAllCourse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String valAll=request.getParameter("valAll");  	
    	String[] cnos=valAll.split("@");
    	
    	CourseBiz biz = new CourseBiz();
    	
    	try {
        	for (String cno : cnos) {
    			biz.deleteCourse(cno);
    		}
        	request.getRequestDispatcher("/CourseQuerySvl?operate=querycourse").forward(request, response);
		} catch (Exception e) {
			Log.logger.error(e.getMessage(),e);
			request.setAttribute("msg", "Network error Please call admin!");
			request.getRequestDispatcher("/error.jsp").forward(request, response);
		}
	}

}