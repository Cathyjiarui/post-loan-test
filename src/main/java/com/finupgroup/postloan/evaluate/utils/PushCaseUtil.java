package com.finupgroup.postloan.evaluate.utils;

import com.finupgroup.postloan.evaluate.vo.OverDueVo;
import com.finupgroup.postloan.external.enums.RelationShip;
import com.finupgroup.postloan.external.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @ClassName PushCaseUtil
 * @Description 推送案件封装类
 * @Author ZhangJia
 * @Date 2019-02-20 17:06
 * @Version 1.0
 **/
@Slf4j
@Repository
public class PushCaseUtil {

    @Autowired
    private OAuth2RestTemplate restTemplate;

    @Autowired
    private DataUtil dataUtil;

    /**
     * @Description 推送案件至贷后
     * @Param [url, baseVo, serviceCode]
     * @return java.lang.String
     **/
    public String PushCase(String url, BaseVO baseVo, String serviceCode) {
        log.info("请求的URL地址为" + url + "?serviceCode=" + serviceCode);
        try {
            EntrustCaseResultVO resultVo = restTemplate.postForObject(url + "?serviceCode=" + serviceCode, baseVo, EntrustCaseResultVO.class);
            return resultVo.getMessage();
        }catch (Exception e){
            return "Push failed";
        }
    }

    /**
     * @Description 拼装推送案件信息
     * @Param [overDueVo]
     * @return com.finupgroup.postloan.external.vo.BaseVO
     **/
    public BaseVO AssembleCase(OverDueVo overDueVo){
        Date d = new Date();
        CustomerVO CustomerVo = new CustomerVO();
        CustomerVo.setBankcard("6111111111116666666");
        CustomerVo.setBankPhone("13910527756");
        CustomerVo.setCompanyAddress("CompanyAddressTest");
        CustomerVo.setCompanyName("CompanyNameTest");
        CustomerVo.setCoreCustomerId(overDueVo.getCoreLendCustomerId());
        CustomerVo.setDepartment("DepartmentTest");
        CustomerVo.setEducateLevel("本科");
        CustomerVo.setEntryDate(d);
        CustomerVo.setHouseAddress("HouseAddressTest");
        CustomerVo.setHukouAddress("HukouAddressTest");
        CustomerVo.setIdNo(overDueVo.getIdNo());
        CustomerVo.setMaritalStatus("已婚");
        CustomerVo.setOpenbank("中国建设银行");
        CustomerVo.setOpenbankCode("105");
        CustomerVo.setPhone("15270780610");
        CustomerVo.setPhoneOpenDate(d);
        CustomerVo.setPhoneOwner("D座");
        CustomerVo.setPosition("员工");
        CustomerVo.setQq("1111111");
        CustomerVo.setServiceId("12412");
        CustomerVo.setSex("男");
        CustomerVo.setUserName(overDueVo.getName());
        CustomerVo.setWeibo(null);
        CustomerVo.setWeixin(null);
        CustomerVo.setWorkingLife("15");

        ContactPhoneVO ContactPhoneVo = new ContactPhoneVO();
        ContactPhoneVo.setPhones(new String[] { "13910527756", "13910527756" });
        ContactPhoneVo.setRelationShip(RelationShip.SELF);
        ContactPhoneVo.setUserName("本人电话");

        CaseVO CaseVo = new CaseVO();
        CaseVo.setApplyUserStaffId(12412L);
        CaseVo.setBigdataNo("998822");
        CaseVo.setContractCode(overDueVo.getLendContractCode());
        CaseVo.setCoreRequestId(overDueVo.getCoreRequestId());
        CaseVo.setLoanAmount(overDueVo.getAmount().doubleValue());
        CaseVo.setLoanPurpose("取现");
        CaseVo.setPassTime(d);
        CaseVo.setRequestId(dataUtil.StringExtractLong(overDueVo.getRequestId()));
        CaseVo.setSalespeople("SalespeopleTest");
        CaseVo.setSeller(244L);
        CaseVo.setSellerName("SellerNameTest");
        CaseVo.setSellGroup(400L);
        CaseVo.setSellGroupName("一组");
        CaseVo.setSignedAmount(overDueVo.getSignedAmount().doubleValue());
        CaseVo.setStoreProvince("东莞分部");
        CaseVo.setSubmiter(1L);
        CaseVo.setSubmiterName("SubmiterNameTest");
        CaseVo.setIsDeposit(overDueVo.getIsDeposit());
        CaseVo.setLoanChannelType("LoanChannelTypeTest");
        CaseVo.setShopName(overDueVo.getShopName());
        CaseVo.setStoreCity(overDueVo.getCity());
        CaseVo.setLoanChannelType(overDueVo.getLoanChannelType());
        CaseVo.setSignedDate(d);

        BaseVO baseVo = new BaseVO();
        baseVo.setCaseVo(CaseVo);
        baseVo.setCustomerVo(CustomerVo);
        List<ContactPhoneVO> list_p = new ArrayList<>();
        list_p.add(ContactPhoneVo);
        baseVo.setContactPhoneVoList(list_p);

        return baseVo;
    }
}
