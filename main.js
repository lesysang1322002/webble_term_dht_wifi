var deviceName;
var bleService;
var bleCharacteristic;
var gattCharacteristic;
var bluetoothDeviceDetected;
function isWebBluetoothEnabled() {
    if (!navigator.bluetooth) {
    console.log('Web Bluetooth API is not available in this browser!');
    // log('Web Bluetooth API is not available in this browser!');
    return false
    }

    return true
}
function requestBluetoothDevice() {
if(isWebBluetoothEnabled){
// log1('FINDING...');
navigator.bluetooth.requestDevice({
    filters: [{
        name: deviceName
    }],
    optionalServices: [bleService]
    })         
.then(device => {
    var dev=device;
    // log1(dev.name);
    console.log('Đang kết nối với', dev);
    return device.gatt.connect();
})
.then(server => {
        console.log('Getting GATT Service...');
        // log1('GET Ser...');
        return server.getPrimaryService(bleService);
    })
    .then(service => {
        console.log('Getting GATT Characteristic...');
        // log1('GET Cha... ');
        return service.getCharacteristic(bleCharacteristic);
    })
    .then(characteristic => {
    // log1("CONNECTED");
    gattCharacteristic = characteristic
    gattCharacteristic.addEventListener('characteristicvaluechanged', handleChangedValue)
    return gattCharacteristic.startNotifications()
    // document.querySelector('#start').disabled = false;
    // document.querySelector('#stop').disabled = true;
})
.catch(error => {
        console.log("Không thể kết nối với thiết bị " + error);
        // log("Không thể kết nối với thiết bị" + error);
        log1("ERROR");
    });
}}
function requestalldevice(){
// log1('FINDING...');
navigator.bluetooth.requestDevice({
filters: [
{services: ['battery_service']},
{services: ['0000ffe0-0000-1000-8000-00805f9b34fb']}
]
})
.then(device => {
    var dev=device;
    // log1(dev.name);
    console.log('Đang kết nối với', dev);
    return device.gatt.connect();
})
.then(server => {
        console.log('Getting GATT Service...');
        log('Đang truy cập GATT Service...');
        return server.getPrimaryService();
    })
    .then(service => {
        console.log('Getting GATT Characteristic...');
        log('Đang truy cập GATT Characteristic... ');
        return service.getCharacteristic();
    })
    .then(characteristic => {
    log("Đã kết nối với: " + dev.name);
    gattCharacteristic = characteristic
    gattCharacteristic.addEventListener('characteristicvaluechanged', handleChangedValue)
    // document.querySelector('#start').disabled = false;
    // document.querySelector('#stop').disabled = true;
})
.catch(error => {
        console.log("Không thể kết nối với thiết bị" + error);
        log("Không thể kết nối với thiết bị" + error);
    });
}
function disconnect()
{
    log1("STATUS");
    console.log("Đã ngắt kết nối với: " + dev.name);
    return dev.gatt.disconnect();
}

let checklog;
function performFunction() {
    const checkbox = document.getElementById("myCheckbox");
    if (checkbox.checked) {
        checklog=true;
    } else {
        checklog=false;
    }
}
let check;
function Checkshowtime() {
    const checkbox = document.getElementById("Checkbox");
    if (checkbox.checked) {
        check=true;
    } else {
        check=false;
    }
}

function handleChangedValue(event) {
let data = event.target.value;
let i=0;
// Khởi tạo một mảng để chứa dữ liệu từ mảng uint8_t
let dataArray = new Uint8Array(data.buffer);
let kytu=String.fromCharCode(dataArray[0]);
if(kytu=="1" || kytu=="2"){
    i=1;
}
// Khởi tạo chuỗi để chứa dữ liệu từ mảng uint8_t
let valueString = '';

// Lặp qua mảng để trích xuất dữ liệu từng phần tử
for (i; i < dataArray.length; i++) {
    valueString += String.fromCharCode(dataArray[i]);
}
if(kytu==1){
    valueString=valueString+"*C";
    logValue1(valueString);
}
else if(kytu==2){
    valueString=valueString+"%";
    logValue2(valueString);
}
else{
var now = new Date();
console.log(' -> ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() +' '+ valueString);
$('#battery_level').text(valueString);
log(valueString );}
}
//Hiển thị văn bản
function log(text) {
    if(checklog){
    const now = new Date();
    const prefixlog = now.getHours() + ':' + now.getMinutes() + ':'  + now.getSeconds() + ' -> ';

    if(check) $('.text-log').val($('.text-log').val() + prefixlog + text );
    else  $('.text-log').val($('.text-log').val() + text);
}
}
let isScanning = true;
function toggleFunction() {
const button = document.getElementById("toggleButton");

if (isScanning) {
    button.innerText = "DISCONNECT";
    requestBluetoothDevice();
    isScanning = false;
} else {
    button.innerText = "SCAN";
    disconnect();
    isScanning = true;
}
}
function log1(text){
const navbarTitle = document.getElementById('navbarTitle');
navbarTitle.textContent = text;
}
function logValue1(text){
const navbarTitle = document.getElementById('Value1');
navbarTitle.textContent = text;
}
function logValue2(text){
const navbarTitle = document.getElementById('Value2');
navbarTitle.textContent = text;
}
function show1(){
    var hiddenContent = document.getElementById("hiddenContent1");
    var visibleContent = document.getElementById("visibleContent");
    deviceName='DHT BLE';
    bleService = 'battery_service';
    bleCharacteristic = 'battery_level';
    console.log('DHT BLE');
    if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        visibleContent.style.display = "none";
    } else {
        hiddenContent.style.display = "none";
        visibleContent.style.display = "block";
    }
}
function show2(){
    var hiddenContent = document.getElementById("hiddenContent2");
    var visibleContent = document.getElementById("visibleContent");
    deviceName = 'JDY-33-BLE';
    bleService = '0000ffe0-0000-1000-8000-00805f9b34fb';
    bleCharacteristic = '0000ffe1-0000-1000-8000-00805f9b34fb';
    console.log('JDY-33-BLE');
    if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        visibleContent.style.display = "none";
    } else {
        hiddenContent.style.display = "none";
        visibleContent.style.display = "block";
    }
}
function show3(){
    var hiddenContent = document.getElementById("hiddenContent3");
    var visibleContent = document.getElementById("visibleContent");
    deviceName='ConfigWifi';
    bleService = 'battery_service';
    bleCharacteristic = 'battery_level';
    if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        visibleContent.style.display = "none";
    } else {
        hiddenContent.style.display = "none";
        visibleContent.style.display = "block";
    }
}
function show4(){
    var hiddenContent = document.getElementById("hiddenContent");
    var visibleContent = document.getElementById("visibleContent");
    
    if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        visibleContent.style.display = "none";
    } else {
        hiddenContent.style.display = "none";
        visibleContent.style.display = "block";
    }
}
function back(){
    var hiddenContent1 = document.getElementById("hiddenContent1");
    var hiddenContent2 = document.getElementById("hiddenContent2");
    var hiddenContent3 = document.getElementById("hiddenContent3");
    if (hiddenContent1.style.display === "block") {
        hiddenContent1.style.display = "none";
        visibleContent.style.display = "block";
    }
    if (hiddenContent2.style.display === "block") {
        hiddenContent2.style.display = "none";
        visibleContent.style.display = "block";
    }
    if (hiddenContent3.style.display === "block") {
        hiddenContent3.style.display = "none";
        visibleContent.style.display = "block";
    }
}
function nextWeb() {
    var url = "http://bluetooth-internals";
    window.location.href = url;
}

function ConnectWifi() {
    // Lấy giá trị từ các ô nhập văn bản
  var input1Value = document.getElementById("input1").value;
  var input2Value = document.getElementById("input2").value;

  // Kết hợp dữ liệu từ hai ô nhập thành một chuỗi
  var combinedString = input1Value +";"+ input2Value;

  // Chuyển chuỗi thành mảng byte (Uint8Array)
  var data = new TextEncoder().encode(combinedString);

  // Gửi dữ liệu dưới dạng mảng byte đến BLE
  
  gattCharacteristic.writeValue(data)
  .then(() => {
      log("Data sent successfully.");
      console.log("Data sent successfully.");
  })
  .catch(error => {
      log("Error sending data: " + error);
      console.log("Error sending data: " + error);
  });
}