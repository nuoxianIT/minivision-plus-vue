//将key、value存入localStorage中,且存入时间为{{ min }}分钟
export function setLocalStorage(key, value, min)
{
  localStorage.setItem(key, value);

}
//从localStorage中取出key对应的value.且先判断是否过期，若过期，则清楚所有缓存，返回false
export function getLocalStorage(key)
{
  return localStorage.getItem(key);
}

export function removeLocalStorage(key)
{
  localStorage.removeItem(key);
}

export function clearLocalStorage()
{
  localStorage.clear();
}
