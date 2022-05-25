const HOSTNAME: string = "http://192.168.0.102:8888/app_v1/vizagservermaster/api/";
const domain: string = "http://192.168.0.102:8888/app_v1/vizagservermaster/api/";
export const environment = {
  production: false,
  twowheelers: HOSTNAME + 'twowheelers.php',
  fourwheelers: HOSTNAME + 'fourwheelers.php',
  register: HOSTNAME + 'register.php',
  user: HOSTNAME + 'getUserDetails.php',
  login: HOSTNAME + 'login.php',
  document: HOSTNAME + 'getUserDocument.php',
  logoutall: HOSTNAME + 'logoutall.php',
  logoutthis: HOSTNAME + 'logoutthis.php',
  operationverification: HOSTNAME + 'isClientAurthorized.php',
  apptoken: 'A6B2B3952ED84C7B46B7F759E435E',
  HOSTNAME: domain,
  booking: HOSTNAME + 'getBooking.php',
  isVehicleAvailable: HOSTNAME + 'isVehicleAvailable.php',
  dp: HOSTNAME + 'getMyDp.php',
  dpUpdate: HOSTNAME + 'updateMyDp.php'
};

