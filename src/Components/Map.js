import * as React from 'react';
import pin from '../images/pin.png';

const Map = (props) => {
    const apikey = props.apikey;
    const gps = props.gps;
    
    // Mapの参照設定
    const mapRef = React.useRef(null);

    /** 
    * useLayoutEffectを使うことで早期描画
    * useEffectでもok
    */

    React.useLayoutEffect(() => {
        // 最初の実行でmapRefが存在しないとき
        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: apikey
        });
        const defaultLayers = platform.createDefaultLayers();
        
        // 設定
        var omvService = platform.getOMVService({ path: "v2/vectortiles/core/mc" });
        var baseUrl = "https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/";

        // create a Japan specific style
        var style = new H.map.Style(`${baseUrl}normal.day.yaml`, baseUrl);

        // instantiate provider and layer for the base map
        var omvProvider = new H.service.omv.Provider(omvService, style);
        var omvlayer = new H.map.layer.TileLayer(omvProvider, { max: 22 ,dark:true});

        // instantiate (and display) a map:
        var map = new H.Map(mapRef.current, omvlayer, {
            zoom: 16,
            center: { lat: gps.lat, lng: gps.lng },
        });

        // 地図のresizeのイベント
        window.addEventListener("resize", () => map.getViewPort().resize());

        // 地図の拡大縮小と移動を可能にする
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        
        // // Create the default UI components
        // var ui = H.ui.UI.createDefault(map, defaultLayers); 
        
        // マーカに関する制御は以下
        var LocationOfMarker = { lat: gps.lat, lng: gps.lng };

        // var pngIcon = new H.map.Icon('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm10.881-2.501c0-1.492-.739-2.83-1.902-3.748l.741-.752c1.395 1.101 2.28 2.706 2.28 4.5s-.885 3.4-2.28 4.501l-.741-.753c1.163-.917 1.902-2.256 1.902-3.748zm-3.381 2.249l.74.751c.931-.733 1.521-1.804 1.521-3 0-1.195-.59-2.267-1.521-3l-.74.751c.697.551 1.141 1.354 1.141 2.249s-.444 1.699-1.141 2.249zm-16.479 1.499l-.741.753c-1.395-1.101-2.28-2.707-2.28-4.501s.885-3.399 2.28-4.5l.741.752c-1.163.918-1.902 2.256-1.902 3.748s.739 2.831 1.902 3.748zm.338-3.748c0-.896.443-1.698 1.141-2.249l-.74-.751c-.931.733-1.521 1.805-1.521 3 0 1.196.59 2.267 1.521 3l.74-.751c-.697-.55-1.141-1.353-1.141-2.249zm16.641 14.501c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.602 1.888-2.98 4.608-3.619l1.154 1.824c-.401.068-.806.135-1.178.242-3.312.949-3.453 2.109-.021 3.102 2.088.603 4.777.605 6.874-.001 3.619-1.047 3.164-2.275-.268-3.167-.296-.077-.621-.118-.936-.171l1.156-1.828c2.723.638 4.611 2.016 4.611 3.618z"/></svg>', { size: { w: 56, h: 56 } });

        var pngIcon = new H.map.Icon(pin, {size: {w: 56, h: 56}});

        // Create a marker using the previously instantiated icon:
        var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

        // Add the marker to the map:
        map.addObject(marker);
    
        // Optionally, 
        //Show the marker in the center of the map
        map.setCenter(LocationOfMarker)

        // クリーンアップ関数、コンポーネントのアンマウント時に起こる
        return () => {
        map.dispose();
        };
    }, [props.apikey, props.gps.lat, props.gps.lng]);
    return <div style={ { width: "70%", height: "500px" } }  ref={mapRef}  />;
};
export default Map;
