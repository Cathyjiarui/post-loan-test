package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName renmaiZhonganPushTestCase
 * @Description 任买众安案件推送
 * @Author ZhangJia
 * @Date 2019-10-12 19:01
 * @Version 1.0
 **/
@Repository
public class renmaiZhonganPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setProductName("renmai_zhongan");
        baseVO.getCaseVo().setChannelId(48L);
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}