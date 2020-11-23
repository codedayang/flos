const DEV_HOST = "http://192.168.115.27:3000";
const PROD_HOST = "https://run.mocky.io/v3";


// 请求连接前缀
export const baseUrl = process.env.NODE_ENV === 'production' ? PROD_HOST : DEV_HOST;

// 输出日志信息
export const noConsole = false;

export const WS_HOST = "ws://192.168.115.27:3000";
