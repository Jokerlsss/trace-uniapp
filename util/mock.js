import Mock from 'mockjs'

const BASE_URL = 'http://localhost:5000'

// 单据 - 待处理数据
Mock.mock(BASE_URL+'/mockPendingList', 'get', {
	"data|5-10":[{
	ID: 'YK12883717882',
	tittle: '乐哥学习时间',
	date: '@date("yyyy-MM-dd")',
	equipmentName: '书籍',
	describe: '@city',
	user: '@cname',
	state: '未处理'
	}]
})
