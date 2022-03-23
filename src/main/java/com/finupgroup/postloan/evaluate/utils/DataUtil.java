package com.finupgroup.postloan.evaluate.utils;

import com.puhui.aes.AesEncryptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Repository;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @ClassName DataUtil
 * @Description 数据相关
 * @Author ZhangJia
 * @Date 2019-04-10 11:28
 * @Version 1.0
 **/
@Slf4j
@Repository
public class DataUtil {

    /**
     * @Author zhangjia
     * @Description 字符串中抽取数字
     * @Date 17:30 2019-07-22
     * @Param [requestid]
     * @return java.lang.Long
     **/
    public Long StringExtractLong(String requestid) {
        String regEx = "[^0-9]";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(requestid);
        return Long.valueOf(matcher.replaceAll("").trim());
    }

    /**
     * @Author zhangjia
     * @Description 比较2个list返回差异数据
     * @Date 17:30 2019-07-22
     * @Param [list1, list2]
     * @return java.util.List<java.lang.String>
     **/
    public <T> List<String> getListDifferenceDate(List<T> list1, List<T> list2) {
        List<String> diff = new ArrayList<>();
        Collection<T> collection = CollectionUtils.disjunction(list1, list2);
        List<T> diffObject = new ArrayList<>(collection);
        for (T t : diffObject) {
            diff.add(t.toString());
        }
        return diff;
    }

    /**
     * @Author zhangjia
     * @Description 随机抽取一个
     * @Date 17:31 2019-07-22
     * @Param [T]
     * @return T
     **/
    public <T> T getListOne(List<T> T) {
        Collections.shuffle(T);
        return T.get(0);
    }

    /**
     * @Author zhangjia
     * @Description 根据时间差返回时间
     * @Date 17:31 2019-07-22
     * @Param [date, offset]
     * @return java.util.Date
     **/
    public Date getDate(Date date, int offset) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        calendar.add(Calendar.MONTH, offset);
        return calendar.getTime();
    }

    /**
     * @Author zhangjia
     * @Description 解码URL体
     * @Date 17:31 2019-07-22
     * @Param [url]
     * @return java.lang.String
     **/
    public String decode(String url) {
        try {
            String prevURL = "";
            String decodeURL = url;
            while (!prevURL.equals(decodeURL)) {
                prevURL = decodeURL;
                decodeURL = URLDecoder.decode(decodeURL, "UTF-8");
            }
            return decodeURL;
        } catch (UnsupportedEncodingException e) {
            return "Issue while decoding" + e.getMessage();
        }
    }

    /**
     * @Author zhangjia
     * @Description 加密方法（不进行数据校验）
     * @Date 17:53 2019-07-22
     * @Param [str]
     * @return java.lang.String
     **/
    public String encrypt(String str) {
        if (this.isEmpty(str)) {
            return null;
        }
        return str.indexOf("xy") == 0 ? str : AesEncryptionUtil.encrypt(str);
    }

    /**
     * @Author zhangjia
     * @Description 解密方法（不进行数据校验）
     * @Date 17:56 2019-07-22
     * @Param [str]
     * @return java.lang.String
     **/
    public String decipher(String str) {
        if (this.isEmpty(str)) {
            return null;
        }
        return str.indexOf("xy") < 0 ? str : AesEncryptionUtil.decrypt(str);
    }

    /**
     * @Author zhangjia
     * @Description 判断字符串是否为空
     * @Date 17:55 2019-07-22
     * @Param [str]
     * @return java.lang.Boolean
     **/
    public Boolean isEmpty(String str){
        return str == null || "".equals(str);
    }

    /**
     * @Description 字符串转List
     * @Param [str]
     * @return java.util.List<java.lang.String>
     **/
    public List<String> stringToList(String strs){
        String str[] = strs.split(",");
        return Arrays.asList(str);
    }

    /**
     * @Description 截取git地址中的故事内容
     * @Param [str]
     * @return java.lang.String
     **/
    public String InterceptString(String str){
        if(str.indexOf("CCC") == -1){
            return str.substring(str.lastIndexOf("/") + 1,str.indexOf(".md"));
        }else {
            return str.substring(str.indexOf("CCC"),str.indexOf(".md"));
        }
    }
}