package com.nepu.biz;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.ChoiceDao;
import com.nepu.dao.QuestionDao;
import com.nepu.entity.Choice;
import com.nepu.entity.Question;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@Service("questionBiz")
@Transactional(readOnly = true)
public class QuestionBiz {
	
	private QuestionDao qdao;
	private ChoiceDao cdao;
	/**
	 * add question 
	 * @param qno
	 * @param qtype
	 * @param kno
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void addQuestion(String qno,int qtype,String kno) throws Exception{
		Log.logger.info(" add---------question ");
		
		QuestionDao dao = new QuestionDao();
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String kqid="q"+sd.format(new Date())+"-"+new Date().getTime();
		
		dao.addQuestion(qno, qtype);
		dao.addQuesknow(kqid, qno, kno);
			
	}
	
	/**
	 * complete question
	 * @param qname
	 * @param qanswer
	 * @param qexplain
	 * @param qno
	 * @throws Exception
	 */
	public void completeQuestion(String qname,String qanswer,String qexplain,String qno) throws Exception{
		Log.logger.info(" complete ---questions  ");
		
		qdao.completeQuestion(qname, qanswer, qexplain, qno);
	}
	
	/**
	 * get all question 
	 * @param qname
	 * @param qtype
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Question> QuerybyCon(String qname,String qtype,TurnPage tp) throws Exception{
		Log.logger.info(" get all --------question   ");
		
		return qdao.QuerybyCon(qname, qtype, tp);
	}
	
	/**
	 * delete question by qno 
	 * @param qno
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void delQuestion(String qno)throws Exception{
		Log.logger.info("delete question by qno ");
		
		qdao.delChoice(qno);
		qdao.delQuesKnow(qno);
		qdao.delQuestion(qno);
		
	}
	/**
	 * get question by qno 
	 * @param qno
	 * @return
	 * @throws Exception
	 */
	public Question queryQuesByqno(String qno)throws Exception{
		Log.logger.info("get question by qno");
		
		return qdao.queryQuesByqno(qno);
	}
	
	/**
	 * get all choice by qno
	 * @param qno
	 * @return
	 * @throws Exception
	 */
	public List<Choice> queryChoiceByqno(String qno)throws Exception{
		Log.logger.info("get all choice  by qno ");
		
		
		return qdao.queryChoiceByqno(qno);
	}
	
	/**
	 * update  chose question Info 
	 * @param question
	 * @param oids
	 * @param onames
	 * @throws Exception
	 */
	public void updateChQues(Question question,String []oids,String []onames)throws Exception{
		
		Log.logger.info("update  choose question Info ");
			
		qdao.updateQues(question);
		for(int i=0;i<oids.length;i++){
			cdao.updateChoice(oids[i],onames[i]);
		}
	}
	
	/**
	 * update other question by qno
	 * @param question
	 * @throws Exception
	 */
	public void updateOtherQues(Question question)throws Exception{
		Log.logger.info("update  other question Info ");
		
			qdao.updateQues(question);
		
	}
	
}
