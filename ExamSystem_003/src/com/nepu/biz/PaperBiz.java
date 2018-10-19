package com.nepu.biz;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nepu.dao.PaperDao;
import com.nepu.dao.QuestionDao;
import com.nepu.entity.Choice;
import com.nepu.entity.Paper;
import com.nepu.entity.Question;
import com.nepu.entity.StuAnswer;
import com.nepu.entity.TurnPage;
import com.nepu.util.Log;

@Service("paperBiz")
@Transactional(readOnly = true)
public class PaperBiz {
	
	private PaperDao pdao;
	private QuestionDao qdao;
	/**
	 * add paper 
	 * @param ptitle
	 * @param point
	 * @param alltime
	 * @throws Exception
	 */
	public void addPaper(String pno,String ptitle, double point, int alltime) throws Exception{
		Log.logger.info("add ------PAPER ");
		
			SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
			String ptime = sd.format(new Date());
			Paper paper = new Paper();
			paper.setPno(pno);
			paper.setPtitle(ptitle);
			paper.setPtime(sd.parse(ptime));
			paper.setPoint(point);
			paper.setAlltime(alltime);
			pdao.addPaper(paper);
		
	}
	/**
	 * get all question
	 * @param qno
	 * @param qname
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Question> QuerybyKon(String qno, String qname,TurnPage tp) throws Exception {
		Log.logger.info("query -------------- allquestions");
					
		return qdao.QuerybyKon(qno, qname,tp);
	}
	/**
	 * add Question to paper
	 * @param pno
	 * @param qno
	 * @throws Exception
	 */
	public void addQues(String pno, String qno) throws Exception{
		Log.logger.info("add ------Question to paper ");
		
		SimpleDateFormat sd = new SimpleDateFormat("yyyyMMdd");
		String pqid ="pq"+sd.format(new Date())+"-"+new Date().getTime();
		pdao.addQues(pqid,pno,qno);
		
	
	}
	/**
	 * get all papers 
	 * @param ptitle
	 * @param pno
	 * @param tp
	 * @return
	 * @throws Exception
	 */
	public List<Paper> QuerybyPon(String ptitle, String pno, TurnPage tp) throws Exception {
		
		Log.logger.info("get all --- paper");
		
		return pdao.QuerybyPon(ptitle, pno, tp);
	}
	/**
	 * get all  Questions by pno
	 * @param pno
	 * @return
	 * @throws Exception
	 */
	public List<Question> getAllQuestion(String pno) throws Exception {
		Log.logger.info("get all --- Questions by pno ");
		
		return pdao.getAllQuestion(pno);
	}
	/**
	 * delete paper by pno 
	 * @param pno
	 * @throws Exception
	 */
	@Transactional(rollbackFor = Throwable.class)
	public void deletePaper(String pno) throws Exception{
		Log.logger.info("delete paper by pno ");
		
		pdao.deletePaperQue(pno);
		pdao.deletePaper(pno);
		
	}
	/**
	 * get choice
	 * @param pno
	 * @return
	 * @throws Exception
	 */
	public List<Choice> getAllChoices(String pno) throws Exception{
		Log.logger.info("get all choices by pno ");
		
		return pdao.getAllChoices(pno);
	}
	/**
	 * get all student answers
	 * @param uno
	 * @param pno
	 * @param questions
	 * @return
	 * @throws Exception
	 */
	public List<StuAnswer> getStuanswer(String uno, String pno, List<Question> questions) throws Exception{
		Log.logger.info("get all student answers  ");
		
		List<StuAnswer> list = new ArrayList<StuAnswer>();
		
			for(int i=0;i<questions.size();i++){
				String qno = questions.get(i).getQno();
				StuAnswer stuAnswer =pdao.getStuAnswer(uno,pno,qno);
				list.add(stuAnswer);
			}
		
		return list;
	}
}
