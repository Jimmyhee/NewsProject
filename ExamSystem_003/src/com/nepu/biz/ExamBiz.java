package com.nepu.biz;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.ExamDao;
import com.nepu.util.Log;

@Service("examBiz")
@Transactional(readOnly = true)
public class ExamBiz {
	
	private ExamDao examdao;
	/**
	 * save information of exam
	 * @param pno
	 * @param qno
	 * @param answers
	 * @param uno
	 * @throws Exception
	 */
	public void exam(String pno,String qno,String answers,String uno)throws Exception{
		Log.logger.info("save information of exam");
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String ano="ans"+sd.format(new Date())+"-"+new Date().getTime();
		
		examdao.exam(ano, pno, qno, answers,uno);
		
	}
}
