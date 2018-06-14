var Env = process.argv[2];
console.log(Env)
var defaults = {
    FUCK_HOST: 'http://test.ybwcrm.cc'
};

switch (Env) {
    case 'dev': void(0);
		break;
	case 'build': void(0);
		break;
    case 'onlinebuild': Object.assign(defaults, {
		FUCK_HOST: 'http://api.ybwcrm.com'
	})
		break;
}

Object.keys(defaults).forEach((key) => {
    defaults[key] = JSON.stringify(defaults[key])
})

module.exports = defaults