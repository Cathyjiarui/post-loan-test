package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @ClassName finupSjfpbPushTestCase
 * @Description 速金服PB案件推送
 * @Author JiaZhang
 * @Date 2019/11/19
 * @Version 1.0
 **/
@Repository
public class finupSjfpbPushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        baseVO.getCaseVo().setChannelId(75L);
        baseVO.getCaseVo().setProductName("SJFPB-NOR");
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}
