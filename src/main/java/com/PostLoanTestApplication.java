package com;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {"com.finupgroup.postloan", "com.puhui"})
@MapperScan("com.finupgroup.postloan.evaluate.mapper*")
@EnableScheduling
@EnableMongoAuditing
@EnableAsync
public class PostLoanTestApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(PostLoanTestApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(PostLoanTestApplication.class, args);
        LOGGER.info("Test controller application start");
    }

}
