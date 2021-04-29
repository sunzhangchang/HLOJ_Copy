// ==UserScript==
// @name         HLOJ
// @namespace    http://10.10.22.16/
// @icon         https://img.imgdb.cn/item/608a4ccdd1a9ae528f5221f2.png
// @icon64       https://img.imgdb.cn/item/608a4ccdd1a9ae528f5221f2.png
// @version      0.1
// @description  HLOJ代码复制按钮
// @author       phylesis
// @match        10.10.22.16/submission/*
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	var asdpoi = document.getElementsByClassName("table-responsive")[0];

	function get_code() {
		var tres = '', res = '';
		var codeun = document.getElementsByClassName('sh_sourceCode')[0];
		var codeen = codeun.innerHTML;
		var codeen_length = codeen.length;
		for (let i = 0; i < codeen_length; i++) {
			let c = codeen[i];
			if (c == '<') {
				while (i < codeen_length && codeen[i] != '>') {
					++i;
				}
				if (codeen[i] == '>') {
					continue;
				}
			}
			tres += c;
		}
		var tres_length = tres.length;
		for (let i = 0; i < tres_length; i++) {
			const c = tres[i];
			let tmp = '';
			if (c == '&') {
				for (var j = i; j < tres_length && tres[j] != ';'; j++) {
					tmp += tres[j];
				}
				i = j;
				if (tmp == '&lt') {
					tmp = '<'
				}
				if (tmp == '&gt') {
					tmp = '>';
				}
				if (tmp == '&amp') {
					tmp = '&';
				}
				if (tmp == '&quot') {
					tmp = '"';
				}
				if (tmp == '&apos') {
					tmp = "'";
				}
			}
			if (tmp) {
				res += tmp;
			} else {
				res += c;
			}
		}
		// var res = js_beautify(tres);
		return res;
	}

	function copy() {
		let code = get_code();
		console.log('phylesis\n\n' + code);
		let transfer = document.createElement('textarea');
		asdpoi.appendChild(transfer);
		transfer.value = code;
		transfer.focus();
		transfer.select();
		if (document.execCommand('copy')) {
			document.execCommand('copy');
		}
		transfer.blur();
		// console.log('复制成功');
		asdpoi.removeChild(transfer);
		const d = new Date();
		asdpoi.lastChild.textContent = '复制成功';
		setTimeout(() => {
			asdpoi.lastChild.textContent = '复制';
		}, 800);
	}

	var node = document.createElement("button");
	node.textContent = "复制";
	node.onclick = copy;
	asdpoi.appendChild(node);
})();
