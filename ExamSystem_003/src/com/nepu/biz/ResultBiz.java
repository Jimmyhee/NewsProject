package com.nepu.biz;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.ResultDao;
import com.nepu.dto.Resultdto;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@Service("resultBiz")
@Transactional(readOnly = true)
public class ResultBiz {
	
	private ResultDao rdao;
	/**
	 * add Student Result
	 * @param uno
	 * @param pno
	 * @throws Exception
	 */
	public void addResult(String uno,String pno)throws Exception{
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String said="rslt"+sd.format(new Date())+"-"+new Date().getTime();
		rdao.addResult(said, uno, pno);
	}
	
	/**
	 * get all Result 
	 * @param uno
	 * @param ptitle
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Resultdto> queryResult(String uno,String ptitle,TurnPage tp)throws Exception{
		
		Log.logger.info("query all Result where uno = "+ uno);
		
		return rdao.queryResult(uno, ptitle ,tp); 
	}
}
