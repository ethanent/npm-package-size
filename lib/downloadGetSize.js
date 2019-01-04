const zlib = require('zlib')

const c = require('centra')

module.exports = (tarballLocation) => new Promise(async (resolve, reject) => {
	const res = await c(tarballLocation).stream().send()

	const unzipper = zlib.createGunzip()

	res.pipe(unzipper)

	let totalSize = 0

	unzipper.on('data', (chunk) => {
		totalSize += chunk.length
	})

	unzipper.on('close', () => {
		resolve(totalSize)
	})
})