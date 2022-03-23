package com.finupgroup.postloan.evaluate.service;

import com.finupgroup.postloan.evaluate.vo.OverDueVo;

public interface pushTestCase {

    /**
     * @Description 推送案件
     * @Param [url, overDueVo, serviceCode]
     * @return java.lang.String
     **/
    String pushCase(String url, OverDueVo overDueVo, String serviceCode);
}
