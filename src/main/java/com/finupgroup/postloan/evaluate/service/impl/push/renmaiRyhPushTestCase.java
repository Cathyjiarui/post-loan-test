package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName renmaiRyhPushTestCase
 * @Description 任意花案件推送
 * @Author ZhangJia
 * @Date 2019-10-13 00:02
 * @Version 1.0
 **/
@Repository
public class renmaiRyhPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("RYH-XXQ");
        baseVO.getCaseVo().setChannelId(69L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}