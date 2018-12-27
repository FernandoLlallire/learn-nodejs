const messenger = (proto) => ({
  messenger : () => proto.msg
})

const concatenate = (proto) => ({
  concatenate : (id,msg) => {
    proto.msg = {uuid4: id, msg};
    //console.log(JSON.stringify(proto.msg));
  }
})

const msgFactory = () => {
  const proto = {
  }

  return Object.assign(
    proto,
    messenger(proto),
    concatenate(proto)
  )
}

exports.msgFactory = msgFactory;
