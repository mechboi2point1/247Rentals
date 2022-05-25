const HOSTNAME: string = "http://dev.artbrush.store/api/";
const domain: string = "http://dev.artbrush.store/";
export const environment = {
  production: true,
  twowheelers: HOSTNAME + 'twowheelers.php',
  fourwheelers: HOSTNAME + 'fourwheelers.php',
  register: HOSTNAME + 'register.php',
  user: HOSTNAME + 'getUserDetails.php',
  login: HOSTNAME + 'login.php',
  document: HOSTNAME + 'getUserDocument.php',
  operationverification: HOSTNAME + 'isClientAurthorized.php',
  apptoken: 'A6B2B3952ED84C7B46B7F759E435E',
  HOSTNAME: domain,
  booking: HOSTNAME + 'getBooking.php',
  isVehicleAvailable: HOSTNAME + 'isVehicleAvailable.php'
};

