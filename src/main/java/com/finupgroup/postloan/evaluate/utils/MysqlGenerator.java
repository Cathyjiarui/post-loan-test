package com.finupgroup.postloan.evaluate.utils;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName MysqlGenerator
 * @Description 代码生成工具
 * @Author ZhangJia
 * @Date 2019/1/17 9:34 PM
 * @Version 1.0
 **/
public class MysqlGenerator {

    public static void generateByTables(Map<String, String> dataSource, String packageName, String... tableNames) {

        String projectPath = System.getProperty("user.dir");

        //数据库配置

        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL)
                .setUrl(dataSource.get("dbUrl"))
                .setUsername(dataSource.get("Username"))
                .setPassword(dataSource.get("Password"))
                .setDriverName(dataSource.get("DriverName"));
        /*.setTypeConvert(new MySqlTypeConvert() {
            @Override
            public PropertyInfo processTypeConvert(GlobalConfig globalConfig, String fieldType) {
                //.....
                // 当发现生成的类型并不能满足需求时，可以去这里看，然后重写
            }
        })*/


        //数据表配置
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig
                .setCapitalMode(true) // 全局大写命名 ORACLE 注意
                .setEntityLombokModel(true)// lombok实体
                .setNaming(NamingStrategy.underline_to_camel)// 表名生成策略
                .setInclude(tableNames)// 多个表名传数组
                .setEntityBuilderModel(false)// 【实体】是否为构建者模型（默认 false）
                .setEntityColumnConstant(false)// 【实体】是否生成字段常量（默认 false）
                .entityTableFieldAnnotationEnable(true);

        //全局配置
        GlobalConfig globalConfig = new GlobalConfig()
                .setActiveRecord(false)// 不需要ActiveRecord特性的请改为false
                .setAuthor("zhangjia")
                .setOutputDir(projectPath + "/src/main/java")
                .setFileOverride(true)
                .setEnableCache(false)// XML 二级缓存
                .setBaseResultMap(true)// XML ResultMap
                .setBaseColumnList(false)// XML columList
                .setKotlin(false) //是否生成 kotlin 代码
                .setDateType(DateType.ONLY_DATE)//只使用 java.util.date 代替
                .setIdType(IdType.ID_WORKER)
                .setSwagger2(true)// model swagger2
                .setServiceName("%sService");
        new AutoGenerator()
                .setGlobalConfig(globalConfig)
                .setDataSource(dataSourceConfig)
                .setStrategy(strategyConfig)
                .setTemplateEngine(new FreemarkerTemplateEngine())
                .setPackageInfo(
                        new PackageConfig()
                                .setParent("com.finupgroup.postloan.evaluate")
                                .setEntity("entity" + packageName)
                                .setMapper("mapper" + packageName)
                                .setServiceImpl("service.impl" + packageName)
                                .setService("service" + packageName)
                ).execute();
    }

    public static void main(String[] args) {

        Map<String, String> dataSource = new HashMap<>();
//        dataSource.put("dbUrl", "jdbc:mysql://10.10.206.24:3306/core_customer?useSSL=false");
//        dataSource.put("Username", "admin");
//        dataSource.put("Password", "zG5@R63oW8h$X$JB");
//        dataSource.put("DriverName", "com.mysql.jdbc.Driver");
//        String packageName = ".asset";

        dataSource.put("dbUrl","jdbc:mysql://10.10.231.135:3306/puhui_repay??useSSL=false");
        dataSource.put("Username","root");
        dataSource.put("Password","OYLDASuPfbpsEQB6");
        dataSource.put("DriverName","com.mysql.jdbc.Driver");
        String packageName = ".repay";

        generateByTables(dataSource, packageName, "repay_case_manage");
    }
}