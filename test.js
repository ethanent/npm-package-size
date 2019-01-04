const w = require('whew')

const size = require(__dirname)

const displayPrep = (res) => 'Install size: ' + res.installSize + '   Publish size: ' + res.publishSize

w.add('Simple modern package', async (result) => {
	const res = await size('phin', '3.2.4')

	result(typeof res.installSize === 'number' && typeof res.publishSize === 'number', displayPrep(res))
})

w.add('Older package w/ missing metadata', async (result) => {
	const res = await size('request')

	result(typeof res.installSize === 'number' && typeof res.publishSize === 'number', displayPrep(res))
})

w.test()