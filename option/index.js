var Env = process.argv[2];
console.log(Env)
var defaults = {
  THE_HOST: 'http://test.ybwcrm.cc'
};

switch (Env) {
  case 'dev': void(0);
		break;
	case 'build': void(0);
		break;
  case 'onlinebuild': Object.assign(defaults, {
		THE_HOST: 'http://api.ybwcrm.com'
	})
		break;
}

Object.keys(defaults).forEach((key) => {
    defaults[key] = JSON.stringify(defaults[key])
})

module.exports = defaults
