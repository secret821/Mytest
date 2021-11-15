/**
 * Created by rockyl on 2021/1/18.
 */

const fs = require('fs-extra')
const path = require('path')

function filter(file) {
	let extname = path.extname(file);
	return !(extname === '.tsx' || extname === '.ts');
}

fs.copySync('src', process.argv[2], {filter})
