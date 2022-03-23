package com.finupgroup.postloan.evaluate.service.impl.push;

import com.finupgroup.postloan.evaluate.common.Constants;
import com.finupgroup.postloan.evaluate.service.pushTestCase;
import com.finupgroup.postloan.evaluate.utils.PushCaseUtil;
import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.vo.BaseVO;
import com.finupgroup.postloan.external.vo.CasesInRepayVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName QIANZHANPushTestCase
 * @Description 钱站推送案件
 * @Author finup
 * @Date 2019-10-11 16:03
 * @Version 1.0
 **/
@Repository
public class JieaOnlinePushTestCase implements pushTestCase {

    @Autowired
    private PushCaseUtil pushCaseUtil;

    @Override
    public String pushCase(String url, OverDueVo overDueVo, String serviceCode) {
        BaseVO baseVO = pushCaseUtil.AssembleCase(overDueVo);
        List<CasesInRepayVO> casesInRepayVOS = new ArrayList<>();
        CasesInRepayVO casesInRepayVO = new CasesInRepayVO();
        casesInRepayVO.setCoreRequestId(baseVO.getCaseVo().getCoreRequestId());
        casesInRepayVOS.add(casesInRepayVO);
        baseVO.setCasesInRepayVo(casesInRepayVOS);
        baseVO.getCaseVo().setChannelId(1L);
        baseVO.getCaseVo().setProductName("0");
        return pushCaseUtil.PushCase(url,baseVO,serviceCode);
    }
}