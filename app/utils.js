class Utils {
  static get(url) {
  	return fetch(url, {
  		credentials: 'include'
  	}).then(function(res) {
  		return res.json();
  	});
  }
  static post(url, body, method) {
  	if (method == null) method = 'POST'
  	return fetch(url, {
  		method: method,
  		credentials: 'include',
  		body: JSON.stringify(body || {}),
  		headers: {
  			'Content-Type' : 'application/json',
  			'Accept' : 'application/json'
  		}
  	}).then(function(res) {
  		return res.json();
  	});
  }
}

export default Utils
