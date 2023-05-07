function requestJSON (url, method, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const isGet = method?.toLowerCase() === 'get';
    const paramStr = Object.entries(params).map(([key, val]) => `${key}=${val}`).join("&");
    const reqUrl = isGet ? `${url}?${paramStr}`: url;
        
    // 定义请求方法、url
    xhr.open(method, reqUrl, true);

    // 设置相应数据类型
    xhr.responseType = 'json';
    
    // 设置request header
    if (isGet) {
      xhr.setRequestHeader('Accept', 'application/json');
    } else {
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    
    // 设置监听函数
    xhr.onreadystatechange = () => {
      if (this.readyState !== 4) return;
      if (this.status === 200 || this.status === 304) {
        return resolve(this.response)
      }
      return reject(new Error(this.statusText)) 
    }
    xhr.onerror = () => {
      return new Error(this.statusText);
    }

    // 发送请求
    xhr.send(isGet ? null : paramStr)
  })
} 