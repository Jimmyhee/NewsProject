package com.nepu.biz;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.CourseDao;
import com.nepu.dao.CouteaDao;
import com.nepu.dto.ArrangeInfo;
import com.nepu.entity.Course;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@Service("courseBiz")
@Transactional(readOnly=true)
public class CourseBiz {
	
	private CourseDao coursedao;
	private CouteaDao couteadao;
	/**
	 * query course by condition and page them 
	 * @param cname
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Course> QuerybyCon(String cname, TurnPage tp) throws Exception {
		Log.logger.info("query course by condition and page them");
		
		return coursedao.QuerybyCon(cname,tp);
		
	}
	/**
	 * delete course 
	 * @param cno
	 */
	@Transactional(rollbackFor=Throwable.class)
	public void deleteCourse(String cno) throws Exception{
		Log.logger.info("delete from courses where cno="+cno);
			
		couteadao.deleteCouage(null, cno, null);
		coursedao.deleteCourse(cno);
	}
	/**
	 * query course by cno 
	 * @param cno
	 * @return
	 * @throws Exception
	 */
	public Course getCourseByUno(String cno) throws Exception{
		Log.logger.info("query course where cno="+cno);
		
		return coursedao.getCourseByUno(cno);
		
	}
	/**
	 * update course 
	 * @param cno
	 * @param cname
	 * @param cremark
	 */
	public void updateCourse(String cno, String cname, String cremark) throws Exception{
		Log.logger.info("update course  where cno="+cno);
		
		coursedao.updateCourse(cno, cname, cremark);
	}
	
	/**
	 * add course 
	 * @param course
	 * @throws Exception
	 */
	public void addCourse(Course course) throws Exception {
		Log.logger.info("add course");
		
			coursedao.addCourse(course);
	}
	
	/**
	 * get all courses
	 * @return
	 * @throws Exception
	 */
	public List<Course> getAllCourses() throws Exception{
		Log.logger.info("get all course");
		
		return coursedao.getAllCourses();
	}
	
	/**
	 * get all information of arrangement
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public  List<ArrangeInfo> getArrInfo(TurnPage tp) throws Exception{
		Log.logger.info("get all information of arrangement");
		
		return coursedao.getArrInfo(tp);
	}
	
	/**
	 * get all courses by uno
	 * @param uno
	 * @return
	 * @throws Exception
	 */
	public List<Course> getAllCourses(String uno) throws Exception {
		Log.logger.info("get all courses by uno---"+uno);

		return coursedao.getAllCourses(uno);
	}
}
