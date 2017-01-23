/**
 *
 */
package com.github.alphapz.kashin.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

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
public class DisplayAction extends ActionSupport {

	@Action("")
    public String execute() throws Exception {
		addActionMessage("家臣団能力計算機でっす");

		log.info("アクセスがありました。");

        return SUCCESS;
    }

}
