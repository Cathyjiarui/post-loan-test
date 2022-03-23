package com.finupgroup.postloan.evaluate.config;

import com.finupgroup.postloan.common.config.JsonConfig;
import com.finupgroup.postloan.common.exception.ClientResponseErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * @ClassName RestTemplateConfig
 * @Description OAuth认证
 * @Author ZhangJia
 * @Date 2019/1/18 2:40 PM
 * @Version 1.0
 **/
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new ClientResponseErrorHandler());
        List<HttpMessageConverter<?>> messageConverters = restTemplate.getMessageConverters();
        messageConverters.removeIf(converter -> converter instanceof MappingJackson2HttpMessageConverter);
        messageConverters.add(JsonConfig.fastJsonConverter());

        OkHttp3ClientHttpRequestFactory okHttp3ClientHttpRequestFactory = new OkHttp3ClientHttpRequestFactory();
        restTemplate.setRequestFactory(okHttp3ClientHttpRequestFactory);
        return restTemplate;
    }
}
