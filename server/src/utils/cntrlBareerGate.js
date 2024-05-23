import DigestClient from "digest-fetch";

const isapiPath = 'http://192.168.1.64/ITC/Entrance/barrierGateCtrl';
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<BarrierGateCtrl version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">
  <barrietGateNum>1</barrietGateNum>
  <BarrierGateCtrlList>
    <barrietGateOper>on</barrietGateOper>
  </BarrierGateCtrlList>
</BarrierGateCtrl>
 `


const apiclient = new DigestClient('admin', 'Mos12cow', { basic: false })

apiclient
  .fetch(isapiPath,
     {
    method: 'PUT',
    body: xml,
    headers: {
      'Content-Type': 'application/xml'
    }
    }
  )
    .then(res => res.text())
    .then(data => console.log({data}))
    .catch(err => console.log("err",err))
