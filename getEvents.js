try {
  const params = JSON.parse(value),
  endpoint = params.ovEndpoint,
  //account = '{"userName":"administrator","password":"Hp1nvent!"}',
  apiVer = params.ovVersion;
  var req = new CurlHttpRequest(),
  account = {"userName":params.ovUser,"password":params.ovPassword};
  req.AddHeader('Content-Type: application/json');
  req.AddHeader('X-Api-Version: ' + apiVer);
  res = JSON.parse(req.Post(endpoint + '/rest/login-sessions', JSON.stringify(account)));
  token = res.sessionID
 
  req.AddHeader('Auth: ' + token);
  res = req.Get(endpoint + '/rest/events');
 
  return res
} catch (error) {
  Zabbix.Log(1, 'OneView API Access Error: ' + error)
  return error
}