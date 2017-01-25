/**
 *
 */
package com.github.alphapz.kashin.actions;

import java.util.Date;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

import lombok.extern.log4j.Log4j2;

/**
 * @author A-pZ
 *
 */
@Namespace("/")
@ParentPackage("struts-thymeleaf")
@Results({@Result(name=ActionSupport.SUCCESS,type="thymeleaf",location="index")})
@Log4j2
public class DisplayAction extends ActionSupport implements SessionAware {

	@Action("")
    public String execute() throws Exception {
		addActionMessage("家臣団能力計算機でっす");

		Object isAccess = session.get("isAccess");
		if ( isAccess == null ) {
			session.put("isAccess", new Date());
			log.info(" - new session:{}", session);
		}

        return SUCCESS;
    }

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;

	}

	Map<String, Object> session;

}
