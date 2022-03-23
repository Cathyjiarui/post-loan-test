package com.finupgroup.postloan.evaluate.utils;

import lombok.extern.slf4j.Slf4j;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author cuishaohua
 * @Date 2019/11/8
 */
@Slf4j
public class dbDbcpConPoolSQL {

    private static Connection conn = null;
    PreparedStatement statement = null;
    ResultSet resultset = null;

    //exec select
    public List <Long> selectSQL(String sql, String dataUrl) {
        try {
            List <Long> cid_data = new ArrayList <>();
            dbDbcpConPool conPool = new dbDbcpConPool();
            Connection conn = conPool.getConnection(dataUrl);
            statement = conn.prepareStatement(sql);
            resultset = statement.executeQuery(sql);

            while (resultset.next()) {
                cid_data.add(resultset.getLong("id"));
            }
            conPool.closeConn(resultset, statement, conn);
            return cid_data;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


    // execute insertion
    public boolean insertSQL(String sql, String dataUrl) {
        try {
            dbDbcpConPool conPool = new dbDbcpConPool();
            conn = conPool.getConnection(dataUrl);
            statement = conn.prepareStatement(sql);
            statement.executeUpdate();
            conPool.closeConn(resultset, statement, conn);
            return true;
        } catch (SQLException e) {
            System.out.println("insert mysql-sql error：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("insert mysql-sql other error：");
            e.printStackTrace();
        }
        return false;
    }

    //execute delete
    public boolean deleteSQL(String sql, String dataUrl) {
        try {
            dbDbcpConPool conPool = new dbDbcpConPool();
            conn = conPool.getConnection(dataUrl);
            statement = conn.prepareStatement(sql);
            statement.executeUpdate();
            conPool.closeConn(resultset, statement, conn);
            return true;
        } catch (SQLException e) {
            System.out.println("delete mysql-sql error：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("delete mysql-sql other error：");
            e.printStackTrace();
        }
        return false;
    }

    //execute update
    public boolean updateSQL(String sql, String dataUrl) {
        try {
            dbDbcpConPool conPool = new dbDbcpConPool();
            conn = conPool.getConnection(dataUrl);
            statement = conn.prepareStatement(sql);
            statement.executeUpdate();
            conPool.closeConn(resultset, statement, conn);
            return true;
        } catch (SQLException e) {
            System.out.println("update mysql-sql error：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("update mysql-sql other error：");
            e.printStackTrace();
        }
        return false;
    }
}
