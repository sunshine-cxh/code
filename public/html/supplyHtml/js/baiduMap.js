// �ٶȵ�ͼAPI����
  var map = new BMap.Map("allmap");
  console.log(map)
  map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
  // ��Ӵ��ж�λ�ĵ����ؼ�
  var navigationControl = new BMap.NavigationControl({
    // �����Ͻ�λ��
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE����
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // ������ʾ��λ
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // ��Ӷ�λ�ؼ�
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // ��λ�ɹ��¼�
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("��ǰ��λ��ַΪ��" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // ��λʧ���¼�
    alert(e.message);
  });
  map.addControl(geolocationControl);// JavaScript Document