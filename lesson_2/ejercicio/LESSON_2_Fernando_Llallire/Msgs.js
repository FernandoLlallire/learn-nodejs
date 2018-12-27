const messenger = (proto) => ({
  messenger : () => proto.msgs
})

const concatenate = (proto) => ({
  concatenate : (id,msg) => {
    proto.msgs = {"uuid4":id,"msg":msg};
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
