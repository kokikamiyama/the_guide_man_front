// 地図の設定
export const mapOption = {
    startZoom: "13", // 開始時のズーム値
    maxZoom: "18", // 最大のズーム値
    minZoom: "5", // 最小のズーム値
};
  
  // 現在地(緯度経度取得)関数
  export const getCurrentPosition = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject));
  