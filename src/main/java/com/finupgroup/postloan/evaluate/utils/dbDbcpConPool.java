package com.finupgroup.postloan.evaluate.utils;

import org.apache.commons.dbcp.BasicDataSource;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * @Author cuishaohua
 * @Date 2019/11/6
 */
public class dbDbcpConPool {
    private static final Log log = LogFactory.getLog(dbDbcpConPool.class);
    private static BasicDataSource dataSource = null;

    //getDataSource -- mysql
    public BasicDataSource getDataSource(String dataUrl) throws Exception {

//        if (dataSource == null) {

//            Properties prop = new Properties();
//            try {
//                prop.load(dbDbcpConPool.class.getClassLoader().getResourceAsStream("dbcp.properties"));
//            } catch (IOException e) {
//                e.printStackTrace();
//            }

        dataSource = new BasicDataSource();

        //dataSource config
//            dataSource.setDriverClassName(prop.getProperty("driverClassName"));
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
//            dataSource.setUsername(prop.getProperty("username"));
        dataSource.setUsername("core_rw");
//            dataSource.setPassword(prop.getProperty("password"));
        dataSource.setPassword("gcWgh1cpTR4%uC6y");
//            dataSource.setUrl(prop.getProperty("url"));
        dataSource.setUrl(dataUrl);
//            dataSource.setMaxActive(Integer.parseInt(prop.getProperty("maxActive")));
        dataSource.setMaxActive(20);
//            dataSource.setMaxIdle(Integer.parseInt(prop.getProperty("maxIdle")));
        dataSource.setMaxIdle(20);
//            dataSource.setMinIdle(Integer.parseInt(prop.getProperty("minIdle")));
        dataSource.setMinIdle(5);
//            dataSource.setInitialSize(Integer.parseInt(prop.getProperty("initialSize")));
        dataSource.setInitialSize(10);
//            dataSource.setMaxWait(Integer.parseInt(prop.getProperty("maxWait")));
        dataSource.setMaxWait(10000);

//        }
        return dataSource;
    }

    /**
     * returnDataSource
     */
    public static void returnDataSource() throws Exception {
        if (dataSource != null) {
            dataSource.close();
        }
    }

    /**
     * get mysql conn
     *
     * @return
     */
    public Connection getConnection(String dataUrl) {
        Connection conn = null;
        try {

            dataSource = getDataSource(dataUrl);
            conn = dataSource.getConnection();

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return conn;
    }

    /**
     * close conn
     *
     * @return
     */
    public void closeConn(ResultSet rs, PreparedStatement ps, Connection con) {
        if (rs != null) {
            try {
                rs.close();
            } catch (Exception e) {
                log.error("close ResultSet error : " + e.getMessage(), e);
            }
        }

        if (ps != null) {
            try {
                ps.close();
            } catch (Exception e) {
                log.error("close PreparedStatement error : " + e.getMessage(), e);
            }
        }

        if (con != null) {
            try {
                con.close();
            } catch (Exception e) {
                log.error("close Connection error : " + e.getMessage(), e);
            }
        }
    }
}
