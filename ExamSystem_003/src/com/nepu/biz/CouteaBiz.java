package com.nepu.biz;


import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.CouteaDao;
import com.nepu.util.Log;

@Service("couteaBiz")
@Transactional(readOnly=true)
public class CouteaBiz {
	
	private CouteaDao couteadao;
	
	/**
	 * add information of arrangement
	 * @param cno
	 * @param uno
	 * @throws Exception
	 */
	public void addArrange(String cno,String uno) throws Exception{
		Log.logger.info("add information of arrangement");
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String ctid="ct"+sd.format(new Date())+"-"+new Date().getTime();
		couteadao.addArrange(ctid, cno, uno);
		
	}


	/**
	 * delete course arrangement
	 * @param ctid
	 * @param cno
	 * @param uno
	 * @throws Exception
	 */
	public void deleteCouage(String ctid, String cno, String uno) throws Exception{
		Log.logger.info("delete course-arragement ");
		
		couteadao.deleteCouage(ctid,cno,uno);
	}

}
