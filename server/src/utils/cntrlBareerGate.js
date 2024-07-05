import DigestClient from "digest-fetch";

const isapiPath = '/ISAPI/ITC/Entrance/barrierGateCtrl';
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<BarrierGateCtrl version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">
  <barrietGateNum>1</barrietGateNum>
  <BarrierGateCtrlList>
    <barrietGateOper>on</barrietGateOper>
  </BarrierGateCtrlList>
</BarrierGateCtrl>
 `


const apiclient = new DigestClient('admin', 'Mos12cow', { basic: false })

export const cntrlBareerGate = (isExit) => {
    const address = isExit ? process.env.EXIT_CAMERA_IP : process.env.ENTRY_CAMERA_IP
    const fullPath = `http://${address}${isapiPath}`
  apiclient
    .fetch(fullPath,
      {
        method: 'PUT',
        body: xml,
        headers: {
          'Content-Type': 'application/xml'
        }
      }
    )
    .then(res => res.text())
    .then(data => console.log({ data }))
    .catch(err => console.log("err", err))
}


