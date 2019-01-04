module.exports = (current, deps) => {
	const build = {}

	build.name = current.name
	build.version = current.version

	build.lockfileVersion = 1

	build.packageIntegrity = current.dist.integrity

	build.preserveSymlinks = true

	build.dependencies = {}

	for (let i = 0; i < deps.length; i++) {
		build.dependencies[deps[i].name] = {
			'version': deps[i].version
		}

		if (typeof deps[i].dist === 'object') {
			build.dependencies[deps[i].name].integrity = deps[i].dist.integrity
			build.dependencies[deps[i].name].resolved = deps[i].dist.tarball
		}

		if (typeof deps[i].dependencies === 'object') {
			build.dependencies[deps[i].name] = deps[i].dependencies
		}
	}

	return build
}