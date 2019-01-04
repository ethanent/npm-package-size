const path = require('path')
const zlib = require('zlib')

const metadata = require('npm-data')
const semver = require('semver')

const genSyntheticLockfile = require(path.join(__dirname, 'lib', 'genSyntheticLockfile.js'))
const downloadGetSize = require(path.join(__dirname, 'lib', 'downloadGetSize.js'))

const getSize = async (name, version = 'latest', recursing = false) => {
	const data = await metadata(name, version)

	let publishSize = typeof data === 'object' && typeof data.dist === 'object' && typeof data.dist.unpackedSize === 'number' ? data.dist.unpackedSize : -1

	if (publishSize === -1) {
		publishSize = await downloadGetSize(data.dist.tarball)
	}

	let installSize = publishSize

	let depsData = []

	if (typeof data.dependencies === 'object') {
		const deps = Object.entries(data.dependencies)

		for (let i = 0; i < deps.length; i++) {
			const coercedVersion = semver.coerce(deps[i][1])

			const sizeResult = await getSize(deps[i][0], coercedVersion.hasOwnProperty('toString') ? coercedVersion.toString() : 'latest', true)

			depsData.push(sizeResult.data)

			depsData = depsData.concat(sizeResult.depsData)

			installSize += sizeResult.installSize
		}
	}

	if (recursing === false) {
		const approxLockfileSize = Buffer.from(JSON.stringify(genSyntheticLockfile(data, depsData))).length

		installSize += approxLockfileSize

		publishSize += approxLockfileSize
	}

	if (recursing) {
		return {installSize, publishSize, data, depsData}
	}
	else return {
		installSize,
		publishSize,
		'packageMetadata': data
	}
}

module.exports = getSize