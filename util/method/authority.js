import {
	singleToolBarTemplate,
	authorityTemplate
} from '../constant/template'
import store from '../../store/index'
// 权限方法
export default {
	// 获取权限
	AuthorityFilter(path) {
		let authority = JSON.parse(JSON.stringify(authorityTemplate))
		let menu = JSON.parse(JSON.stringify(uni.getStorageSync('menuList')))
		for (let item of menu) {
			for (let subItem of item.children) {
				for (let i of subItem.children) {
					// !路径没有md5加密所以不需要
					// let md5Path = i.md5Path
					// if (!md5Path) {
					//     md5Path = Md5.md5(i.path + i.menuArgs)
					//     i.md5Path = md5Path
					// }
					if (path === i.path) {
						authority.see = i.seeType > 0
						authority.seeType = i.seeType
						authority.alEffectCondition = i.alEffectCondition
						authority.edit = i.edit > 0
						authority.special = i.special
						authority.empower = i.empower
						authority.showMoney = i.edit > 0
						for (let special of i.special) {
							if (special.name === 'showMoney') {
								authority.showMoney = true
							}
						}
						return authority
					}
				}
			}
		}
		return authority
	},
	// 是否授权
	IfEmpower(path, userId) {
		if (userId) {
			if (userId === store.state.userInfo.userId) {
				return true
			}
			let menu = JSON.parse(JSON.stringify(uni.getStorageSync('menuList')))
			for (let item of menu) {
				for (let subItem of item.children) {
					for (let i of subItem.children) {
						if (path === i.path) {
							return i.empower.includes(userId)
						}
					}
				}
			}
			return false
		}
		return true
	},
	// single页面基本权限判断
	setSingleFormState(Authority, id, form) {
		const SingleToolBar = JSON.parse(JSON.stringify(singleToolBarTemplate))
		// 先获取权限
		SingleToolBar.save.Enable = Authority.edit
		SingleToolBar.del.Enable = Authority.edit
		SingleToolBar.lock.Enable = Authority.edit
		SingleToolBar.unlock.Enable = Authority.edit
		if (form === undefined || form.writerID === undefined) {
			// 不存在form或者不存在 form.writerID,不显示删除、锁定、解锁
			SingleToolBar.del.Visible = false
			SingleToolBar.lock.Visible = false
			SingleToolBar.unlock.Visible = false
		} else if (form.lockerID === undefined) {
			// 不存在锁定
			SingleToolBar.lock.Visible = false
			SingleToolBar.unlock.Visible = false
		} else if (form) {
			if (id !== undefined && id < 1) {
				// 新增时删除、锁定、解锁不可操作
				SingleToolBar.del.Enable = false
				SingleToolBar.lock.Enable = false
				SingleToolBar.unlock.Enable = false
				SingleToolBar.approve.Enable = false
			} else {
				// 修改时
				if (form.approveState !== undefined && ['审批中', '已通过'].includes(form.approveState)) {
					// 如果提交审批，保存、删除、锁定、解锁按钮不可操作
					SingleToolBar.save.Enable = false
					SingleToolBar.del.Enable = false
					SingleToolBar.lock.Enable = false
					SingleToolBar.unlock.Enable = false
				} else if (form.locker !== '' || form.lockerID > 0) {
					// 已锁定,保存、删除、锁定不可操作
					SingleToolBar.save.Enable = false
					SingleToolBar.del.Enable = false
					SingleToolBar.lock.Enable = false
					SingleToolBar.approve.Enable = true
					// 只有本人和授权人才可解锁
					if (Authority.edit && ((form.lockerID === store.state.userInfo.userId) || (Authority.empower && Authority.empower.includes(
							form.lockerID)))) {
						SingleToolBar.unlock.Enable = true
					} else {
						SingleToolBar.unlock.Enable = false
					}
				} else {
					// 还未锁定
					SingleToolBar.approve.Enable = false
					SingleToolBar.unlock.Enable = false
					// 已保存
					if (form.writerID > 0) {
						if (Authority.edit && (form.writerID === store.state.userInfo.userId || (Authority.empower && Authority.empower.includes(
								form.writerID)))) {
							SingleToolBar.save.Enable = true
							SingleToolBar.del.Enable = true
						} else {
							SingleToolBar.save.Enable = false
							SingleToolBar.del.Enable = false
						}
					} else if (form.pusherID > 0) {
						// 下推单据还未保存
						SingleToolBar.del.Enable = form.pusherID === store.state.userInfo.userId || (Authority.empower && Authority.empower
							.includes(form.pusherID))
					}
				}
			}
		}
		if (Authority.alEffectCondition !== '审批') {
			SingleToolBar.approve.Visible = false
		}
		return SingleToolBar
	}
}
