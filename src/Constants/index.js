function renderStatusType(num) {
  let status;
  let statusText;
  switch (num) {
    case 1:
      status = 'create';
      statusText = '待处理';
      break;
    case 2:
      status = 'pending';
      statusText = "开发中"
      break;
    case 3:
      status = 'testing'
      statusText = '测试中'
      break;
    case 4:
      status = "success"
      statusText = "需验收"
      break;
    case 5:
      statusText = '已完成'
      status = 'default'
    default:
      break;
  }
  return {
    status, statusText,
  }
}

export {
  renderStatusType
}