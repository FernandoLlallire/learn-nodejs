const messenger = (proto) => ({
  messenger : () => proto.msgs.join(" ") +"\n"
})

const concatenate = (proto) => ({
  concatenate : (newstring) => {
    proto.msgs.push(newstring);
  }
})

const msgFactory = () => {
  const proto = {
    msgs : []
  }

  return Object.assign(
    {},
    messenger(proto),
    concatenate(proto)
  )
}

exports.msgFactory = msgFactory;
