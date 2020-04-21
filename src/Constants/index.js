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


function getSprintStatus(num) {
  let status;
  let statusText;
  switch (num) {
    case 0:
      status = 'create';
      statusText = "未开启";
      break;
    case 1:
      status = 'pending';
      statusText = '进行中';
      break;
    case 2:
      status = 'success';
      statusText = '已结束';
      break;
    default:
      break;
  }
  return {
    status, statusText
  }
}

function getScrumBoardStatus(num) {
  const STATUS_TODO = 'STATUS_TODO';
  const STATUS_DOING = 'STATUS_DOING';
  const STATUS_DONE = 'STATUS_DONE';
  const STATUS_TESTING = 'STATUS_TESTING';
  const STATUS_CHECK = 'STATUS_CHECK';
  let myCode;
  switch (num) {
    case 1:
      myCode = STATUS_TODO;
      break;
    case 2:
      myCode = STATUS_DOING;
      break;
    case 3:
      myCode = STATUS_TESTING;
      break;
    case 4:
      myCode = STATUS_CHECK;
      break;
    case 5:
      myCode = STATUS_DONE;
      break;
    default:
      break;
  }
  return myCode;
}


function parseStatusCode(code) {
  let num;
  let jobType;
  switch (code) {
    case 'STATUS_TODO':
      num = 1;
      break;
    case 'STATUS_DOING':
      num = 2;
      break;
    case 'STATUS_TESTING':
      num = 3;
      break;
    case 'STATUS_CHECK':
      num = 4;
      break;
    case 'STATUS_DONE':
      num = 5
      break;
    default:
      break;
  }
  return num
}


export {
  renderStatusType, getSprintStatus, getScrumBoardStatus, parseStatusCode
}