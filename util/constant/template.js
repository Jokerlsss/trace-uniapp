// single界面工具栏按钮模板
export const singleToolBarTemplate = {
    // 保存按钮
    save: {
        Visible: true,
        Enable: false
    },
    // 删除按钮
    del: {
        Visible: true,
        Enable: false
    },
    // 锁定按钮
    lock: {
        Visible: true,
        Enable: false
    },
    // 解锁按钮
    unlock: {
        Visible: true,
        Enable: false
    },
    // 审批按钮
    approve: {
        Visible: true,
        Enable: true
    }
}
// 权限模板
export const authorityTemplate = {
    // 是否可查看
    see: true,
    // 查看本人、本部门、本公司、所有人
    seeType: 0,
    // 生效条件
    alEffectCondition: '保存',
    // 是否可编辑
    edit: false,
    // 特殊权限
    special: [{}],
    // 授权人员ID
    empower: [],
    // 是否有查看金额权限
    showMoney: false
}