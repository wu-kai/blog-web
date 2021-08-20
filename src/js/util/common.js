import request from "@/js/api/request";

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export default {}

export const getPosition = (success, error) => {
  const successCallback = (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    // 百度地图API功能
    const map = new BMap.Map("allmap");
    const point = new BMap.Point(longitude, latitude);
    map.centerAndZoom(point, 12);
    //浏览器定位
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        const mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        const gc = new BMap.Geocoder();
        const pointAdd = new BMap.Point(r.point.lng, r.point.lat);
        gc.getLocation(pointAdd, function (rs) {
          // 百度地图解析城市名
          console.log(rs);
          success(rs.addressComponents);
        })
      } else {
        alert('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true });
  };
  const errorCallback = () => {
    error();
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
};

export const uploadImage = (file) => {
  request('/api/uploadFile_to_qiniu', file)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
};
