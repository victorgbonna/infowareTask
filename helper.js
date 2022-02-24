const calcOffset=({pageNo, pageSize})=>{
    return(pageNo-1)*pageSize
  }

  const successWrapper=({
    status=200,
    message='Success',
    data=null,
    res
})=>{
    return res.status(status).json({
        message,
        data
    })
}
const errorWrapper=({
    status=500,
    message=['Something went wrong'],
    res
})=>{
    return res.status(status).json({
        message
    })
}

module.exports={calcOffset, successWrapper, errorWrapper}