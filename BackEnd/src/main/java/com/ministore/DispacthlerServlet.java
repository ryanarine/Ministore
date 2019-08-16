package com.ministore;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class DispacthlerServlet extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return null;
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return ( new Class[] {MinistoreConfig.class});
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] {"/"};
	}

}
