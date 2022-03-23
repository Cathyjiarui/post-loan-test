package com.finupgroup.postloan.evaluate.config;

import com.finupgroup.postloan.common.config.JsonConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * @ClassName MessageConverterConfig
 * @Description 日志
 * @Author ZhangJia
 * @Date 2019/1/18 2:30 PM
 * @Version 1.0
 **/
@Configuration
public class MessageConverterConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(JsonConfig.fastJsonConverter());
        super.configureMessageConverters(converters);
    }
}