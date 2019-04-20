/*
 * @Author: FangXiaoHui
 * @Date:   2018-12-25 14:13:00
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-01-16 18:30:05
 */

/*
 * 用于格式化无敌的后端返回数据
 */

import moment from 'moment';

export default class Organize {
  constructor({organizationId, organizationType, organizationTypeValue, organizationFullName, industryType, industryTypeValue, regionKey, regionValue, staffSizeKey, staffSizeValue, startDate, endDate, legalPerson, email, zoneCode, telephone, organizationLogo, manager, application}) {
    this.organizationId = organizationId;
    this.organizationType = organizationType;
    this.organizationTypeValue = organizationTypeValue;
    this.organizationFullName = organizationFullName;
    this.industryType = [industryType];
    this.industryTypeValue = industryTypeValue;
    this.regionKey = regionKey.splice(0, 1);
    this.regionValue = regionValue.join('-');
    this.staffSizeKey = staffSizeKey;
    this.staffSizeValue = staffSizeValue;
    this.date = [new Date(startDate), new Date(endDate)];
    this.legalPerson = legalPerson;
    this.email = email;
    this.zoneCode = zoneCode;
    this.telephone = telephone;
    this.organizationLogo = organizationLogo;
    this.manager = {
      mobilePhone: manager.mobilePhone,
      managerName: manager.managerName,
      cardId: manager.cardId,
      sex: manager.sex,
      Year: manager.birthDay ? formatDate(manager.birthDay)[0] : '',
      Month: manager.birthDay ? formatDate(manager.birthDay)[1] : '',
      Day: manager.birthDay ? formatDate(manager.birthDay)[2] : '',
      email: manager.email,
      qq: manager.qq
    };
    this.applicationId = application.map(item => {
      return item.applicationId
    });
  }
}

export function initOrgonaztion(data) {
  return new Organize(data)
}

function formatDate(birthDay) {
  return birthDay.split('-');
}