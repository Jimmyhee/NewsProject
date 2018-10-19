package com.nepu.biz;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nepu.dao.KnowledgeDao;
import com.nepu.dto.Know;
import com.nepu.entity.Knowledge;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@Service("knowledgeBiz")
public class KnowledgeBiz {
	
	private KnowledgeDao kdao;
	/**
	 * get all knowledge points by condition
	 * @param kname
	 * @param uno
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Know> QuerybyCon(String kname,String uno,TurnPage tp) throws Exception{
		Log.logger.info("get all knowledge points by condition");		
		
		return kdao.QuerybyCon(kname, uno, tp);
	}
	
	
	/**
	 * add knowledge point
	 * @param cno
	 * @param kname
	 * @throws Exception
	 */
	public void addknow(String cno, String kname) throws Exception{
		Log.logger.info("add ------knowledge point: "+kname);
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String kno="k"+sd.format(new Date())+"-"+new Date().getTime();
			
		kdao.addknow(kno,cno,kname);
		
	}

	/**
	 * delete knowledge point
	 * @param kno
	 * @throws Exception
	 */
	public void deleteKnow(String kno) throws Exception{
		Log.logger.info("delete knowledge point :"+kno);
		
			kdao.deleteKnow(kno);
	}

	/**
	 * get knowledge point by kno
	 * @param kno
	 * @return
	 * @throws Exception
	 */
	public Knowledge getKnowBykno(String kno) throws Exception {
		Log.logger.info("query knowledge point:"+kno);
		
		return kdao.getKnowBykno(kno);
	}

	/**
	 * update knowledge point
	 * @param kno
	 * @param kname
	 * @throws Exception
	 */
	public void updateKnow(String kno, String kname) throws Exception{
		Log.logger.info("update knowledge point");
		
			kdao.updateKnow(kno,kname);
	}
	
	/**
	 * get all knowledge points by cno
	 * @param cno
	 * @return
	 * @throws Exception
	 */
	public List<Knowledge> getAllknowBycno(String cno) throws Exception {
		Log.logger.info("get all knowledge points by cno :"+cno);
		
		return kdao.getAllknowBycno(cno);
	}

}
