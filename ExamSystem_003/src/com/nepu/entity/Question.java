package com.nepu.entity;

public class Question {
	private String qno; 
	private String qname;
	private String qanswer;
	private String qexplain;
	private int qtype;  
	
	public int getQtype() {
		return qtype;
	}
	public void setQtype(int qtype) {
		this.qtype = qtype;
	}

	public String getQno() {
		return qno;
	}
	public void setQno(String qno) {
		this.qno = qno;
	}
	public String getQname() {
		return qname;
	}
	public void setQname(String qname) {
		this.qname = qname;
	}
	public String getQanswer() {
		return qanswer;
	}
	public void setQanswer(String qanswer) {
		this.qanswer = qanswer;
	}
	public String getQexplain() {
		return qexplain;
	}
	public void setQexplain(String qexplain) {
		this.qexplain = qexplain;
	}
	
}
