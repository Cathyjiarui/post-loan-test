package com.finupgroup.postloan.evaluate.config;

import org.springframework.context.annotation.*;
import org.springframework.core.type.AnnotatedTypeMetadata;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @ClassName SwaggerConfig
 * @Description swagger配置
 * @Author ZhangJia
 * @Date 2019-01-24 11:14
 * @Version 1.0
 **/
@Conditional(SwaggerConfig.SwaggerCondition.class)
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket userApi() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select().paths(PathSelectors.regex("/pushTestCase.*")).build();
    }

    private static ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("自动化测试文档").description("自动化测试文档").licenseUrl("http://wiki.puhuitech.cn").version("1.0").build();
    }

    public static class SwaggerCondition implements Condition {

        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            return !"production".equals(context.getEnvironment().getProperty("spring.profiles.active"));
        }

    }
}
