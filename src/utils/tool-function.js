// 获取所有元素父节点
function getParentTag(startTag, parentTagList = []) {
    // 传入标签是否是DOM对象
    if (!(startTag instanceof HTMLElement)) return console.error('receive only HTMLElement');
    // 父级标签是否是body,是着停止返回集合,反之继续
    if ('BODY' !== startTag.parentElement.nodeName) {
        // 放入集合
        parentTagList.push(startTag.parentElement)
        // 再上一层寻找
        return getParentTag(startTag.parentElement, parentTagList)
    }
    // 返回集合,结束
    else return parentTagList;
}

export {
    getParentTag,
}
