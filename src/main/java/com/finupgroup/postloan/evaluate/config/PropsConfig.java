package com.finupgroup.postloan.evaluate.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @ClassName PropsConfig
 * @Description 配置文件读取
 * @Author ZhangJia
 * @Date 2019-01-29 14:34
 * @Version 1.0
 **/
@Component
@ConfigurationProperties(prefix = "host")
public class PropsConfig {

    private final External external = new External();

    private final Postloan postloan = new Postloan();

    public External getExternal() {
        return external;
    }

    public Postloan getPostloan() {
        return postloan;
    }

    public static class External {

        private String url;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class Postloan {

        private String url;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}