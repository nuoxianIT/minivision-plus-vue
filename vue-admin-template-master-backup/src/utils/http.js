import service from './request';

const URL = '/reus';

export function doPost(param, url) {
  return service({
    url: URL + url,
    method: 'post',
    data: param
  }).catch(function (error) {
    console.log(error);
  })

}
